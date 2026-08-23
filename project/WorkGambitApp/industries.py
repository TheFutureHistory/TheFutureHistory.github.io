import json
from typing import List, Dict
from collections import Counter

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

def count_industries(listings: List[Dict]) -> Dict[str, int]:
    """Count occurrences of each industry."""
    industries = []
    
    for listing in listings:
        industry = listing.get('Industry', '').strip()
        if industry:  # Only count non-empty industries
            industries.append(industry)
        else:
            industries.append('No Industry Listed')
    
    # Count occurrences
    industry_counts = Counter(industries)
    
    return dict(industry_counts)

def save_industry_report(industry_counts: Dict[str, int], filename: str = "industryReport.json"):
    """Save industry counts to JSON file."""
    try:
        # Sort by count (descending) then by name (ascending)
        sorted_industries = dict(sorted(industry_counts.items(), 
                                      key=lambda x: (-x[1], x[0])))
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(sorted_industries, f, indent=2, ensure_ascii=False)
        print(f"Industry report saved to: {filename}")
    except Exception as e:
        print(f"Error saving industry report: {e}")

def print_industry_summary(industry_counts: Dict[str, int], total_listings: int):
    """Print a detailed summary of industries."""
    total_industries = len(industry_counts)
    
    print(f"INDUSTRY SUMMARY")
    print("=" * 60)
    print(f"Total listings: {total_listings}")
    print(f"Unique industries: {total_industries}")
    print()
    
    # Sort by count (descending) then by name (ascending)
    sorted_industries = sorted(industry_counts.items(), key=lambda x: (-x[1], x[0]))
    
    print(f"{'Industry':<30} {'Count':<8} {'Percentage'}")
    print("-" * 60)
    
    for industry, count in sorted_industries:
        percentage = (count / total_listings) * 100
        print(f"{industry:<30} {count:<8} {percentage:.1f}%")
    
    print("-" * 60)
    print(f"{'TOTAL':<30} {total_listings:<8} 100.0%")

def main():
    print("Industry Counter for Listings")
    print("=" * 50)
    
    # Load listings
    listings = load_listings("listingWithImage.json")
    
    if not listings:
        print("No listings found or file could not be read.")
        return
    
    print(f"Loaded {len(listings)} listings from listingWithImage.json\n")
    
    # Count industries
    industry_counts = count_industries(listings)
    
    # Print summary
    print_industry_summary(industry_counts, len(listings))
    
    # Save report
    save_industry_report(industry_counts, "industryReport.json")
    
    print(f"\n✅ Analysis completed!")
    print(f"📊 Found {len(industry_counts)} unique industries")
    print(f"📁 Report saved to: industryReport.json")

if __name__ == "__main__":
    main()