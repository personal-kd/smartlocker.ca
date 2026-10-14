# SmartLocker website (GitHub Pages)

A static site with no build step. Every link is relative, so it works on a custom domain (smartlocker.ca)
or on a GitHub project address (username.github.io/repo-name/).

## Files
- `index.html`: homepage with the 3D tour
- `products.html`: product pages (`products.html#smart-tracker`, `#smart-key-systems`, `#locker-gun-storage`,
  wall units `#wu50`, `#wu80`, `#wu160`, safe units `#su40`, `#su160`, `#su400`)
- `contact.html`: request a quote and contact forms (`contact.html#quote`, `#contact`, or `#quote-smart-tracker` to pre-select a product)
- `terms.html`, `privacy.html`: legal pages
- `404.html`: shown for missing pages
- `favicon.svg`, `.nojekyll` (tells GitHub Pages to serve the files as they are)

## Publish on GitHub Pages
1. Create a repository on GitHub (for example `smartlocker-site`) and upload everything in this folder to it,
   including the hidden `.nojekyll` file.
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Use your own domain (smartlocker.ca)
1. In **Settings > Pages > Custom domain**, enter `smartlocker.ca` (or `www.smartlocker.ca`) and save.
   GitHub adds a `CNAME` file to the repository for you.
2. At your domain registrar or DNS host, point the domain to GitHub Pages:
   - For `smartlocker.ca`, add four **A** records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - For `www.smartlocker.ca`, add a **CNAME** record pointing to `<your-username>.github.io`
3. Once the domain checks pass, tick **Enforce HTTPS**.

## Turn on form emails (Formspree)
GitHub Pages cannot run server code, so the forms use Formspree to email submissions.
1. Create a free account at formspree.io and create a new form. Set it to send to info@smartlocker.ca.
2. Copy the form's endpoint URL (it looks like `https://formspree.io/f/abcdwxyz`).
3. Open `contact.html`, find this line near the top, paste the URL between the quotes, and commit:
   `window.SL_FORM_ENDPOINT = "";`
4. Send a test from the live site and confirm the first submission in your Formspree inbox if asked.

Until the URL is added, the forms open the visitor's email app with everything filled in, so no enquiry is lost.
