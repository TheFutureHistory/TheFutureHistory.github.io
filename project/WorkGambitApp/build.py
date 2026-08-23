import json

# Load JSON data
with open("listings.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data = sorted(data, key=lambda x: x.get("Title", "").lower())

# Function to normalize title for image filenames
def normalize_title(title):
    return title.strip().lower().replace(" ", "")

# Generate HTML for each listing
listings_html = ""
for item in data:
    if not item.get("Title"):
        continue

    img_filename = f"./static/images/{normalize_title(item['Title'])}.png"
    img_alt = item.get("Image Alt Text", item["Title"])

    def normalize_class(s):
        return s.strip().lower().replace(" ", "") + "Listing"

    # Create a unique ID for each listing (for favorites functionality)
    listing_id = normalize_title(item['Title'])

    listings_html += f"""
    <section class="listingInfo {normalize_class(item.get('Type',''))} {normalize_class(item.get('Region',''))} {normalize_class(item.get('Remote',''))} {normalize_class(item.get('Access',''))} {normalize_class(item.get('Industry',''))}" data-listing-id="{listing_id}">
        <a href="{item.get('URL','#')}" target="_blank" class="listing-link">
            <img src="./static/images/{normalize_title(item['Title'])}.png" alt="{item.get('Image Alt Text', item['Title'])}" class="listingInfo_img">
            <div class="listingInfo_nameCont">
                <p class="listingInfo_name">{item['Title']}</p>
            </div>
            <div class="listingInfo_grid">
                <p class="listingInfo_type">{item.get('Type','')}</p>
                <p class="listingInfo_region">{item.get('Region','')}</p>
                <p class="listingInfo_remote">{item.get('Remote','')}</p>
                <p class="listingInfo_access">{item.get('Access','')}</p>
                <p class="listingInfo_industry">{item.get('Industry','')}</p>
            </div>
        </a>
        <button class="favorite-btn" data-listing-id="{listing_id}" data-title="{item['Title']}" aria-label="Add to favorites">
            <svg class="star-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
        </button>
    </section>
    """

# Read HTML template
with open("index.template.html", "r", encoding="utf-8") as f:
    template = f.read()

# Inject listings into placeholder
final_html = template.replace("<!-- LISTINGS_PLACEHOLDER -->", listings_html)

# Save final index.html
with open("index.html", "w", encoding="utf-8") as f:
    f.write(final_html)

print("✅ index.html generated successfully with favorites functionality")