# Glow & Glam Studio — Drop-In Gallery System

This folder controls the photo galleries across the website. 
You can update the website's portfolio and service galleries simply by dropping images into the corresponding folders here!

## How it works
The website automatically scans these folders during the build process and generates the masonry galleries for you.
If a folder is empty, the website will display an elegant "Gallery Coming Soon" placeholder instead of a broken page.

## Folders & Pages
- `/bridal/` → Shows up on the Bridal Makeup service page.
- `/reception/` → Shows up on the Reception Makeup service page.
- `/party/` → Shows up on the Party Makeup service page.
- `/engagement/` → Shows up on the Engagement Makeup service page.
- `/hairstyling/` → Shows up on the Hairstyling service page.
- `/portfolio-featured/` → Shows up on the main Portfolio page.
- `/hero/` → Used for the homepage hero carousel.
- `/about/` → Used for the About page imagery.
- `/reviews/` → Used for customer review avatars/photos.

## Naming & Sorting
The galleries sort images **alphabetically by filename**. 
To control the exact order the photos appear in the grid, use numbers at the start of your filenames:
- `01-bride.jpg`
- `02-reception-look.jpg`
- `03-detail.jpg`

## Format & Size Best Practices
To ensure the website loads incredibly fast:
1. **Images**: `.webp`, `.jpeg`, `.jpg`, `.png` are supported. WebP or compressed JPG is recommended (under 300KB each, ~1600px long edge).
2. **Videos**: `.mp4` and `.webm` are now supported! They will automatically play as looping preview clips in the gallery grid and open in the full-size video player when clicked. Keep video clips short (under 5–10MB) for fast page loading.

## Deployment Note (IMPORTANT)
When running the development server (`npm run dev`), dropping an image in here will appear on the site instantly.
However, because this is a **static site deployed to GitHub Pages**, changes on the live production site will ONLY appear after you `git commit` and `git push` your new photos to trigger a rebuild!
