# The Collection Jewelers website

This repository holds a single landing page for The Collection Jewelers, a luxury watch collection.

There are no wholesale or cost prices anywhere in this project. Public price text, when shown, is only “Inquire for price”.

## Files

- `index.html` — the only page. It loads inventory from `inventory.json`.
- `inventory.json` — the watch list shown on the page. Edit this file to add, remove, or change pieces.
- `CNAME` — points GitHub Pages at thecollectionjewelers.com.
- `robots.txt` and `sitemap.xml` — basic search-engine files.

## How to update the inventory

1. Open `inventory.json`.
2. Add, remove, or edit an object in the array.
3. Save the file and commit the change. After GitHub Pages rebuilds, the site will show the new list.

If `inventory.json` is empty (`[]`) or cannot be loaded, the page shows “New inventory coming soon”.

### JSON template

Copy this object into the array and replace the placeholder text:

```json
{
  "name": "Sample item – replace me",
  "category": "Watch",
  "description": "Reference XXXX. New, 2026.",
  "image": "https://example.com/watch.jpg",
  "price": "Inquire for price",
  "status": "Available – reserve to view",
  "brand": "Brand name",
  "model": "Model name",
  "reference": "Reference number"
}
```

- `name` is the headline on the card.
- `category` should stay `"Watch"`.
- `description` can include the reference, condition (for example New or Pre-owned), and year.
- `image` should be a public image URL, or an empty string `""` to use the styled placeholder.
- `price`, if present, is retail inquiry text only. Do not add wholesale or cost prices.
- `status` is shown on the card, for example `"Available – reserve to view"`.
- `brand`, `model`, and `reference` are optional helpers for editing and are also used on the card when present.

Every piece must be reserved and paid in advance, because pieces are stored in different locations. Contact is through Facebook.
