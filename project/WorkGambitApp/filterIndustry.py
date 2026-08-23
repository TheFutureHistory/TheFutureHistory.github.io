import json
from typing import List, Dict

def load_listings(filename: str = "listingWithImage.json") -> List[Dict]:
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

def filter_and_sort_listings(listings: List[Dict]) -> List[Dict]:
    """Filter out Tech, Finance, Gig industries and sort alphabetically by industry."""
    
    # Industries to exclude
    excluded_industries = {'tech', 'finance', 'gig'}
    
    # Filter out excluded industries
    filtered_listings = []
    excluded_count = 0
    
    for listing in listings:
        industry = listing.get('Industry', '').strip().lower()
        
        # Check if industry contains any of the excluded terms
        should_exclude = any(excluded_term in industry for excluded_term in excluded_industries)
        
        if not should_exclude:
            filtered_listings.append(listing)
        else:
            excluded_count += 1
            print(f"Excluded: {listing.get('Title', 'Unknown')} (Industry: {listing.get('Industry', 'Unknown')})")
    
    # Sort by Industry alphabetically (case-insensitive)
    sorted_listings = sorted(filtered_listings, key=lambda x: x.get('Industry', '').strip().lower())
    
    print(f"\nFiltering complete:")
    print(f"Original listings: {len(listings)}")
    print(f"Excluded listings: {excluded_count}")
    print(f"Remaining listings: {len(sorted_listings)}")
    
    return sorted_listings

def save_listings(listings: List[Dict], filename: str = "listingsFiltered.json"):
    """Save filtered and sorted listings to JSON file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(listings, f, indent=2, ensure_ascii=False)
        print(f"Filtered listings saved to: {filename}")
    except Exception as e:
        print(f"Error saving to {filename}: {e}")

def print_industry_summary(listings: List[Dict]):
    """Print summary of industries in the filtered results."""
    industry_counts = {}
    
    for listing in listings:
        industry = listing.get('Industry', 'Unknown').strip()
        industry_counts[industry] = industry_counts.get(industry, 0) + 1
    
    print(f"\nINDUSTRY BREAKDOWN (Alphabetical):")
    print("-" * 50)
    
    for industry in sorted(industry_counts.keys()):
        count = industry_counts[industry]
        print(f"{industry}: {count} listing{'s' if count != 1 else ''}")

def main():
    print("Filter and Sort Listings by Industry")
    print("=" * 50)
    print("Excluding: Tech, Finance, Gig industries")
    print("Sorting: Alphabetically by Industry\n")
    
    # Load listings
    listings = load_listings("listingWithImage.json")
    
    if not listings:
        print("No listings found or file could not be read.")
        return
    
    print(f"Loaded {len(listings)} listings from listingWithImage.json\n")
    
    # Filter and sort listings
    filtered_sorted_listings = filter_and_sort_listings(listings)
    
    # Save to new file
    save_listings(filtered_sorted_listings, "listingsFiltered.json")
    
    # Print industry summary
    print_industry_summary(filtered_sorted_listings)
    
    print(f"\n✅ Process completed successfully!")
    print(f"Output file: listingsFiltered.json")

if __name__ == "__main__":
    main()