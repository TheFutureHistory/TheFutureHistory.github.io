import json
import os
from typing import List, Dict, Set

def load_json_file(filename: str) -> List[Dict]:
    """Load and return JSON data from a file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data if isinstance(data, list) else []
    except FileNotFoundError:
        print(f"Error: {filename} not found.")
        return []
    except json.JSONDecodeError as e:
        print(f"Error reading {filename}: {e}")
        return []

def get_image_files(images_folder: str) -> Set[str]:
    """Get all image files from the static/images folder."""
    if not os.path.exists(images_folder):
        print(f"Warning: {images_folder} folder not found.")
        return set()
    
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'}
    image_files = set()
    
    for filename in os.listdir(images_folder):
        name, ext = os.path.splitext(filename)
        if ext.lower() in image_extensions:
            image_files.add(name.lower())  # Store lowercase for case-insensitive matching
    
    return image_files

def has_corresponding_image(title: str, image_files: Set[str]) -> bool:
    """Check if a listing title has a corresponding image file."""
    if not title:
        return False
    
    # Check various possible image name formats
    title_lower = title.lower()
    title_clean = title_lower.replace(" ", "_").replace("-", "_")
    title_nospace = title_lower.replace(" ", "")
    
    # Check if any variation of the title matches an image file
    return any(variant in image_files for variant in [title_lower, title_clean, title_nospace])

def separate_listings_by_images(listings: List[Dict], image_files: Set[str]) -> tuple[List[Dict], List[str]]:
    """Separate listings into those with images and those without."""
    listings_with_images = []
    listings_without_images = []
    
    for listing in listings:
        title = listing.get("Title", "").strip()
        if title:
            if has_corresponding_image(title, image_files):
                listings_with_images.append(listing)
            else:
                listings_without_images.append(title)
    
    return listings_with_images, listings_without_images

def save_to_js_file(data: List, filename: str, variable_name: str = "listings"):
    """Save data as a JavaScript file with exported variable."""
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(f"// Auto-generated file - {len(data)} entries\n")
            file.write(f"const {variable_name} = ")
            json.dump(data, file, indent=2, ensure_ascii=False)
            file.write(f";\n\nexport default {variable_name};\n")
        print(f"Successfully saved {len(data)} entries to {filename}")
    except Exception as e:
        print(f"Error saving to {filename}: {e}")

def save_to_json_file(data: List[Dict], filename: str):
    """Save data as a JSON file."""
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"Successfully saved {len(data)} entries to {filename}")
    except Exception as e:
        print(f"Error saving to {filename}: {e}")

def main():
    print("Starting image availability check...")
    
    # 1. Load cleaned listings
    print("\n1. Loading cleaned listings...")
    listings = load_json_file("listingsCleaned.json")
    
    if not listings:
        print("No listings found. Please ensure listingsCleaned.json exists and contains data.")
        return
    
    print(f"   - Loaded {len(listings)} listings from listingsCleaned.json")
    
    # 2. Get available images
    print("\n2. Scanning for images...")
    images_folder = "static/images"
    image_files = get_image_files(images_folder)
    print(f"   - Found {len(image_files)} image files in {images_folder}")
    
    # 3. Separate listings by image availability
    print("\n3. Checking image availability for listings...")
    listings_with_images, listings_without_images = separate_listings_by_images(listings, image_files)
    
    # 4. Save listings without images (as JS file)
    print("\n4. Saving listings without images...")
    save_to_js_file(listings_without_images, "listingsNoImage.js", "listingsNoImage")
    
    # 5. Save listings with images (as JSON file)
    print("\n5. Saving listings with images...")
    save_to_json_file(listings_with_images, "listingWithImage.json")
    
    # Summary
    print(f"\n=== SUMMARY ===")
    print(f"Total listings processed: {len(listings)}")
    print(f"Listings WITH images: {len(listings_with_images)}")
    print(f"Listings WITHOUT images: {len(listings_without_images)}")
    print(f"Files created: listingsNoImage.js, listingWithImage.json")
    
    if listings_without_images:
        print(f"\nFirst 5 listings missing images:")
        for title in listings_without_images[:5]:
            print(f"   - {title}")
        if len(listings_without_images) > 5:
            print(f"   ... and {len(listings_without_images) - 5} more")

if __name__ == "__main__":
    main()