import os
import re
import requests
import time
from urllib.parse import quote
from typing import List

def load_missing_companies(filename: str) -> List[str]:
    """Extract company names from the JavaScript file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Extract the array content between [ and ]
        start = content.find('[')
        end = content.rfind(']')
        if start == -1 or end == -1:
            print("Error: Could not find array in the file")
            return []
        
        array_content = content[start+1:end]
        
        # Extract quoted strings
        companies = re.findall(r'"([^"]*)"', array_content)
        print(f"Found {len(companies)} companies in {filename}")
        return companies
        
    except FileNotFoundError:
        print(f"Error: {filename} not found")
        return []
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return []

def clean_company_name_for_domain(company_name: str) -> str:
    """Convert company name to a domain-friendly format."""
    # Remove common suffixes and words that aren't part of domains
    company = company_name.lower()
    
    # Remove common business suffixes
    suffixes_to_remove = [
        ' inc', ' inc.', ' llc', ' llc.', ' ltd', ' ltd.', ' corp', ' corp.',
        ' company', ' co', ' co.', ' group', ' groups', ' international',
        ' global', ' solutions', ' services', ' technologies', ' tech',
        ' systems', ' software', ' consulting', ' consulting group'
    ]
    
    for suffix in suffixes_to_remove:
        if company.endswith(suffix):
            company = company[:-len(suffix)].strip()
    
    # Remove special characters and spaces
    company = re.sub(r'[^a-zA-Z0-9]', '', company)
    
    # Handle special cases
    replacements = {
        '4dayweek': '4dayweek',
        'jobsinconstruction': 'jobsinconstruction',
        'woodyjobs': 'woodyjobs',
        'digitalmarketingjobs': 'digitalmarketingjobs',
        'avianation': 'avianation'
    }
    
    return replacements.get(company, company)

def download_logo(company_name: str, output_folder: str, delay: float = 1.0) -> bool:
    """Download logo from Clearbit API."""
    
    # Clean the company name for domain format
    domain_name = clean_company_name_for_domain(company_name)
    
    # Try multiple domain variations
    domain_variations = [
        f"{domain_name}.com",
        f"{domain_name}.co",
        f"{domain_name}.io",
        f"{domain_name}.net",
        f"{domain_name}.org"
    ]
    
    for domain in domain_variations:
        try:
            url = f"https://logo.clearbit.com/{domain}"
            
            # Make request with timeout
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(url, headers=headers, timeout=10)
            
            # Check if we got a valid image
            if response.status_code == 200 and len(response.content) > 1000:  # Minimum size check
                content_type = response.headers.get('content-type', '')
                if 'image' in content_type:
                    
                    # Determine file extension
                    if 'png' in content_type:
                        ext = '.png'
                    elif 'jpeg' in content_type or 'jpg' in content_type:
                        ext = '.jpg'
                    elif 'svg' in content_type:
                        ext = '.svg'
                    else:
                        ext = '.png'  # default
                    
                    # Clean filename
                    safe_filename = re.sub(r'[^a-zA-Z0-9\s\-_]', '', company_name)
                    safe_filename = re.sub(r'\s+', '_', safe_filename.strip())
                    filename = f"{safe_filename}{ext}"
                    filepath = os.path.join(output_folder, filename)
                    
                    # Save the image
                    with open(filepath, 'wb') as f:
                        f.write(response.content)
                    
                    print(f"✓ Downloaded: {company_name} -> {filename} (from {domain})")
                    time.sleep(delay)  # Be respectful to the API
                    return True
            
            # If this variation didn't work, try the next one
            time.sleep(0.5)  # Short delay between attempts
            
        except requests.exceptions.RequestException as e:
            continue  # Try next domain variation
        except Exception as e:
            continue  # Try next domain variation
    
    print(f"✗ Failed: {company_name} (tried {len(domain_variations)} domain variations)")
    return False

def main():
    # Configuration
    input_file = "listingsNoImage.js"
    output_folder = "downloaded_logos"
    delay_between_requests = 1.0  # seconds
    
    print("Starting logo download process...")
    print(f"Output folder: {output_folder}")
    print(f"Delay between requests: {delay_between_requests} seconds\n")
    
    # Create output folder
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"Created folder: {output_folder}")
    
    # Load company names
    companies = load_missing_companies(input_file)
    if not companies:
        print("No companies found to process.")
        return
    
    # Download logos
    successful_downloads = 0
    failed_downloads = 0
    
    print(f"\nProcessing {len(companies)} companies...\n")
    
    for i, company in enumerate(companies, 1):
        print(f"[{i}/{len(companies)}] Processing: {company}")
        
        if download_logo(company, output_folder, delay_between_requests):
            successful_downloads += 1
        else:
            failed_downloads += 1
    
    # Summary
    print(f"\n{'='*50}")
    print(f"DOWNLOAD COMPLETE")
    print(f"{'='*50}")
    print(f"Successful downloads: {successful_downloads}")
    print(f"Failed downloads: {failed_downloads}")
    print(f"Total processed: {len(companies)}")
    print(f"Success rate: {(successful_downloads/len(companies)*100):.1f}%")
    print(f"Images saved to: {output_folder}/")

if __name__ == "__main__":
    main()