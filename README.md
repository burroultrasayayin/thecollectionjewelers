# The Collection Jewelers website

A multi-page site for The Collection Jewelers. Plain HTML, CSS, and a little JavaScript. No build step.

There are no wholesale or cost prices anywhere in this project. Public price text is “Price on request” on the Rolex and Patek Philippe pieces, and “Inquire for price” on earlier items. There are no dollar amounts.

## Pages

- `index.html` — home, with Rolex and Patek Philippe highlights plus more from the collection
- `watches.html` — Rolex and Patek Philippe sections, then the full inventory with brand filters
- `about.html`
- `how-to-buy.html` — reservation and prepaid payment
- `contact.html` — inquiry form, plus “Contact us through Facebook”
- `inventory.json` — the single watch list used by the home and watches pages
- `inventory.js` — loads that list
- `styles.css`, `images/og.jpg`, `CNAME`, `robots.txt`, `sitemap.xml`

Preview screenshots (`preview-desktop.png`, `preview-mobile.png`) are for review only. Do not commit them.

## How to update the inventory

1. Open `inventory.json`.
2. Add, remove, or edit an object in the array.
3. Save the file and commit the change. After GitHub Pages rebuilds, both the home page and the watches page will use the new list.

If `inventory.json` is empty (`[]`) or cannot be loaded, the pages show “New inventory coming soon”.

### JSON template

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

- `price`, if present, is retail inquiry text only. Do not add wholesale or cost prices.
- Keep image URLs as they are unless you are replacing a photo.
- Every piece must be reserved and paid in advance, because pieces are stored in different locations.

The contact form posts to FormSubmit at `lafamdmc@gmail.com`, subject “New Collection Jewelers inquiry”.
