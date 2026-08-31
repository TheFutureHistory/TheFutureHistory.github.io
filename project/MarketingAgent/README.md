# Marketing Agent

A JSON-powered 9:16 social media image generator designed for Netlify.

## Current structure

- `index.html`, `style.css`, `script.js`: browser preview and manual PNG export.
- `content.json`: local sample content for the preview.
- `images/`: local background assets.
- `netlify/functions/`: server-side automation endpoints.
- `netlify.toml`: Netlify deployment and function configuration.

## Deploy to Netlify

1. Push this project to a Git repository.
2. Create a new site in Netlify from that repository.
3. Leave the build command empty.
4. Set the publish directory to `.` if Netlify does not read `netlify.toml` automatically.
5. Deploy the site.
6. Open `/api/health` on the deployed site. It should return JSON with `"ok": true`.

The site will use `content.json` until the Google Drive integration is added. The next step is to add a server-side renderer and a Google Drive reader/uploader. Credentials belong in Netlify environment variables, never in this repository.

## Image selection design

Gemini only needs to provide the post text. Images can be stored together in the configured Google Drive folder without categories or special filenames.

The Netlify function will later list all compatible images in that folder and select one automatically. It can use random selection or rotate through the available images to reduce repetition. The `backgroundImage` field is used only as a local preview fallback while the Drive integration is being built.
