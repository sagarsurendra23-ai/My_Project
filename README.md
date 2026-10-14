# KARNA.LAB — Data Science Portal

A futuristic, responsive front-end study website with a student profile and five data-science learning modules.

## Features
- No login or backend required.
- Profile card for student name, roll number, branch, college, and photo URL. Use **Edit profile** to personalize it; edits last only while the page is open.
- Five study modules, each with an 11-page PDF source and a built-in flipbook reader.
- Each module has two options: **Online viewer** opens the built-in flipbook, while **Download PDF** saves the original PDF for offline study. The reader uses bundled page images.
- Animated interface, responsive layout, glass effects, neon accents, and scroll reveals.

## Run it
1. Extract the ZIP while keeping the `assets` folder beside `index.html`.
2. Open `index.html` in a modern browser.
3. If your browser restricts local file access, run a local server from this folder:

   ```bash
   python3 -m http.server 8000
   ```

4. Visit `http://localhost:8000`.

The flipbook page images are included locally, so the reader does not depend on an external PDF viewer. The Google Fonts link is optional; the site uses fallback fonts if you are offline.
