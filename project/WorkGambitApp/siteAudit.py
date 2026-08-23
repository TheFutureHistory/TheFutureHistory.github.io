import requests
import json
import time
from typing import List, Dict
from urllib.parse import urlparse
from datetime import datetime

def load_listings(filename: str = "problematicListings.json") -> List[Dict]:
    """Load listings from JSON file."""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except FileNotFoundError:
        print(f"Error: {filename} not found in current directory.")
        return []
    except json.JSONDecodeError as e:
        print(f"Error reading {filename}: {e}")
        return []

def is_secure_url(url: str) -> bool:
    """Check if URL uses HTTPS protocol."""
    parsed = urlparse(url)
    return parsed.scheme.lower() == 'https'

def check_listing_url(listing: Dict, timeout: int = 10) -> Dict:
    """Check if a listing's URL is secure and working."""
    
    url = listing.get('URL', '').strip()
    title = listing.get('Title', 'Unknown')
    
    result = {
        'title': title,
        'url': url,
        'is_secure': False,
        'is_working': False,
        'status_code': None,
        'response_time': None,
        'issues': [],
        'checked_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'original_listing': listing
    }
    
    # Check if URL exists
    if not url:
        result['issues'].append('No URL provided')
        return result
    
    # Check if URL is secure (HTTPS)
    result['is_secure'] = is_secure_url(url)
    if not result['is_secure']:
        result['issues'].append('Not secure (HTTP instead of HTTPS)')
    
    # Check if URL is working
    try:
        start_time = time.time()
        response = requests.get(url, timeout=timeout, allow_redirects=True)
        response_time = round((time.time() - start_time) * 1000, 2)
        
        result['status_code'] = response.status_code
        result['response_time'] = response_time
        
        if 200 <= response.status_code < 400:
            result['is_working'] = True
        else:
            result['issues'].append(f'HTTP {response.status_code} error')
            
    except requests.exceptions.Timeout:
        result['issues'].append(f'Timeout after {timeout} seconds')
    except requests.exceptions.ConnectionError:
        result['issues'].append('Connection failed')
    except requests.exceptions.RequestException as e:
        result['issues'].append(f'Request error: {str(e)}')
    except Exception as e:
        result['issues'].append(f'Unexpected error: {str(e)}')
    
    return result

def check_all_listings(listings: List[Dict], timeout: int = 10, delay: float = 0.5) -> List[Dict]:
    """Check all listings and return results."""
    results = []
    total = len(listings)
    
    print(f"Checking {total} listing URLs...")
    print("-" * 80)
    
    for i, listing in enumerate(listings, 1):
        title = listing.get('Title', 'Unknown')
        url = listing.get('URL', 'No URL')
        
        print(f"[{i}/{total}] {title}")
        print(f"    URL: {url}")
        
        result = check_listing_url(listing, timeout)
        results.append(result)
        
        # Print immediate result
        secure_status = "🔒 Secure" if result['is_secure'] else "🔓 Not Secure"
        working_status = "✅ Working" if result['is_working'] else "❌ Not Working"
        response_time = f" ({result['response_time']}ms)" if result['response_time'] else ""
        
        print(f"    {secure_status} | {working_status}{response_time}")
        
        if result['issues']:
            for issue in result['issues']:
                print(f"    ⚠️  {issue}")
        
        print()  # Empty line for readability
        
        # Small delay to be respectful to servers
        if i < total:
            time.sleep(delay)
    
    return results

def get_problematic_listings(results: List[Dict]) -> List[Dict]:
    """Filter listings that are not secure or not working."""
    problematic = []
    
    for result in results:
        if not result['is_secure'] or not result['is_working']:
            problematic.append(result)
    
    return problematic

def save_problematic_listings(problematic_listings: List[Dict], filename: str = "problematicListings.json"):
    """Save problematic listings to JSON file with simplified format."""
    try:
        # Create simplified format for problematic listings
        simplified_listings = []
        
        for result in problematic_listings:
            simplified_entry = {
                "Title": result['title'],
                "URL": result['url'],
                "Secure": "Yes" if result['is_secure'] else "No",
                "Working": "Yes" if result['is_working'] else "No"
            }
            simplified_listings.append(simplified_entry)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(simplified_listings, f, indent=2, ensure_ascii=False)
        print(f"Problematic listings saved to: {filename}")
    except Exception as e:
        print(f"Error saving problematic listings: {e}")

def save_all_results(results: List[Dict], filename: str = "allUrlCheckResults.json"):
    """Save all results to JSON file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print(f"All results saved to: {filename}")
    except Exception as e:
        print(f"Error saving all results: {e}")

def print_summary(results: List[Dict]):
    """Print summary of the URL check results."""
    total = len(results)
    secure = len([r for r in results if r['is_secure']])
    working = len([r for r in results if r['is_working']])
    both_good = len([r for r in results if r['is_secure'] and r['is_working']])
    problematic = total - both_good
    
    print(f"{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"Total listings checked: {total}")
    print(f"🔒 Secure (HTTPS): {secure} ({secure/total*100:.1f}%)")
    print(f"✅ Working: {working} ({working/total*100:.1f}%)")
    print(f"🎯 Both secure AND working: {both_good} ({both_good/total*100:.1f}%)")
    print(f"⚠️  Problematic (not secure OR not working): {problematic}")
    
    # Show breakdown of issues
    not_secure = len([r for r in results if not r['is_secure']])
    not_working = len([r for r in results if not r['is_working']])
    
    print(f"\nISSUE BREAKDOWN:")
    print(f"🔓 Not secure: {not_secure}")
    print(f"❌ Not working: {not_working}")
    
    # Show fastest and slowest working sites
    working_sites = [r for r in results if r['response_time'] is not None]
    if working_sites:
        fastest = min(working_sites, key=lambda x: x['response_time'])
        slowest = max(working_sites, key=lambda x: x['response_time'])
        
        print(f"\n🚀 Fastest: {fastest['title']} ({fastest['response_time']}ms)")
        print(f"🐌 Slowest: {slowest['title']} ({slowest['response_time']}ms)")

def main():
    print("Listings URL Security and Status Checker")
    print("=" * 80)
    
    # Load listings
    print("Loading listings from problematicListings.json...")
    listings = load_listings("problematicListings.json")
    
    if not listings:
        print("No listings found or file could not be read.")
        return
    
    print(f"Loaded {len(listings)} listings.\n")
    
    # Check all listings
    results = check_all_listings(listings, timeout=10, delay=0.5)
    
    # Get problematic listings
    problematic = get_problematic_listings(results)
    
    # Print summary
    print_summary(results)
    
    # Save results
    save_problematic_listings(problematic, "problematicListings.json")
    save_all_results(results, "allUrlCheckResults.json")
    
    print(f"\nFiles created:")
    print(f"  - problematicListings.json ({len(problematic)} entries)")
    print(f"  - allUrlCheckResults.json ({len(results)} entries)")
    
    print(f"\nCheck completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()