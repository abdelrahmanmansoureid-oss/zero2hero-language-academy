# ZERO2HERO Language Academy Website

Official website for **ZERO2HERO Language Academy** built with **React.js**, **Vite**, and **Tailwind CSS** in **Light Mode**.

## Academy Details
- **Academy Name:** ZERO2HERO Language Academy
- **Specialization:** English Language Courses (General English, Conversation & Phonetics, Business English & Interview Prep, IELTS Preparation, Kids & Teens, VIP 1-on-1)
- **Study Modes:** Offline (In-Person at Loran Campus) & Live Online
- **Location:** 696 El Horreya Rd., El Fairouza Bldg., Loran, Alexandria Governorate 21532
- **WhatsApp:** [+20 104 116 1062](https://wa.me/201041161062)
- **Facebook:** [ZERO2HERO Language Academy Facebook Page](https://www.facebook.com/profile.php?id=61595698253351&sk=directory_contact_info)

## Tech Stack
- **React.js 18** (`src/App.jsx`, `src/translations.js`)
- **Tailwind CSS 3** (`tailwind.config.js`, `src/index.css`)
- **Vite** (`vite.config.js`)
- **Bilingual Support:** Instant Language Toggle (`English` / `العربية`) with automatic `LTR` / `RTL` layout switching.

## Development & Publishing Versions

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build
```

Each `git commit` and `git push` to `main` automatically triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) to build and publish the new version.
