# SmartLocker website

Static pages plus one serverless function. No build step.

- `index.html`: homepage with the 3D tour (`/`)
- `products.html`: the product pages (`/products#smart-tracker`, `#smart-key-systems`, `#locker-gun-storage`, the wall units `#wu50`, `#wu80`, `#wu160`, and the safe units `#su40`, `#su160`, `#su400`)
- `contact.html`: request a quote and contact forms (`/contact#quote`, `/contact#contact`, or `/contact#quote-smart-tracker` to pre-select a product)
- `terms.html`: Terms and Conditions (`/terms`)
- `privacy.html`: Privacy Policy (`/privacy`)
- `api/contact.js`: emails form submissions to SmartLocker through Resend

## Deploy to Vercel
1. Vercel > Add New > Project, then drag in this folder or import it from Git.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy.

## Turn on form emails
1. Create a free account at resend.com and add an API key.
2. In Vercel > Project > Settings > Environment Variables, add:
   - `RESEND_API_KEY` = your Resend key (required)
   - `TO_EMAIL` = where submissions go (optional, defaults to info@smartlocker.ca)
   - `FROM_EMAIL` = e.g. `SmartLocker Website <web@smartlocker.ca>` after verifying smartlocker.ca in Resend (optional; until then Resend's test sender is used, which only delivers to your Resend account email)
3. Redeploy.

Until the key is set, the forms fall back to opening the visitor's email app with everything pre-filled, so no enquiry is lost.
