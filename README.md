# Premium DevOps & Cloud Portfolio - Syed Adnan

A premium, modern, fully responsive personal portfolio website customized for Syed Adnan, MCA student and aspiring Cloud & DevOps Engineer. Featuring a futuristic glassmorphic UI, high-performance canvas background particles, scroll indicators, mouse-tracking custom cursor, timeline learning maps, and live API integrations (GitHub Dashboard + EmailJS).

## 🚀 Features

- **Futuristic Glassmorphic Dark UI**: High-fidelity dark mode matching premium visual standards (#00D9FF Primary, #6366F1 Secondary, #14F195 Accent).
- **Dynamic Interactivity**: Canvas-based reactive particles, custom spring cursor ring, scroll-progress bars, and fade-in scroll triggers.
- **Data-Driven Sections**: Easily editable JSON files for Skills, Projects, Certifications, Timeline, and Social connections.
- **GitHub Integration**: Live statistics, language distributions, and repository details pulled dynamically using the GitHub REST API (with cached fallbacks).
- **Interactive Forms**: Responsive contact forms with validation and EmailJS cloud delivery.
- **Custom DevOps 404 Page**: Terminal simulator executing Ansible playbooks and redirecting users.

---

## 📂 Project Structure

```
my portfolio/
├── public/
│   ├── favicon.svg          # Custom Cloud & Code favicon
│   └── resume.pdf           # Syed Adnan's Resume (replace with actual PDF)
├── src/
│   ├── assets/              # Static media assets
│   ├── components/          # React Components
│   │   ├── ui/              # Atom/Helper UI Components
│   │   │   ├── IconRenderer.tsx       # Dynamic icon mapping utility
│   │   │   ├── CustomCursor.tsx       # Glowing cursor tracker
│   │   │   ├── ParticleBackground.tsx # Lightweight Canvas particles
│   │   │   ├── LoadingScreen.tsx      # Terminal-style boot screen
│   │   │   ├── ScrollProgress.tsx     # Horizontal scroll depth bar
│   │   │   ├── Navbar.tsx             # Responsive glassmorphism menu
│   │   │   └── BackToTop.tsx          # Scroll-to-top floating button
│   │   ├── Hero.tsx         # Welcome hero section with dynamic typing hook
│   │   ├── About.tsx        # Personal narrative and stat badges
│   │   ├── Skills.tsx       # Progress trackers categorized by operational role
│   │   ├── Timeline.tsx     # Sequential roadmap from Linux to Orchestration
│   │   ├── Projects.tsx     # Categorized project gallery cards
│   │   ├── Certifications.tsx # Verified qualification badges
│   │   ├── GitHubDashboard.tsx # Real-time API interface and contribution widgets
│   │   ├── Resume.tsx       # Interactive academic & skill accordions
│   │   ├── Contact.tsx      # Validation forms with EmailJS connection
│   │   └── Footer.tsx       # Standard branding footer
│   ├── context/
│   │   └── ThemeContext.tsx # Persistent light/dark style states
│   ├── data/                # EASY TO EDIT DATA STORES (JSON)
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── timeline.json
│   │   ├── certifications.json
│   │   └── socialLinks.json
│   ├── hooks/
│   │   └── useScrollSpy.ts  # Viewport listener for nav indicator
│   ├── pages/
│   │   ├── Home.tsx         # Consolidated landing page layout
│   │   └── NotFound.tsx     # DevOps terminal simulator 404 page
│   ├── App.tsx              # Routing and Provider layout
│   ├── index.css            # Tailwind CSS v4 import, theme variables, and global classes
│   └── main.tsx             # Render entrypoint
├── .env                     # App configurations (hidden)
├── package.json             # Build specifications
└── vite.config.ts           # Bundler config (integrates Tailwind v4)
```

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org) (v18+ recommended) installed.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Open the `.env` file in the root directory:
   ```env
   # EmailJS Credentials
   VITE_EMAILJS_SERVICE_ID="your_service_id"
   VITE_EMAILJS_TEMPLATE_ID="your_template_id"
   VITE_EMAILJS_PUBLIC_KEY="your_public_key"

   # GitHub settings
   VITE_GITHUB_USERNAME="SyedAdnan"
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open the link shown in your terminal (usually [http://localhost:5173](http://localhost:5173)) in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   This compiles optimized assets to the `/dist` folder, ready for deployment.

---

## ✍️ Maintenance Guide (Updating Portfolio Content)

The website is designed so you **do not need to write HTML/React code** to update your skills, projects, certifications, or social profiles. Simply edit the JSON files in `src/data/`:

### 1. Update Projects (`src/data/projects.json`)
Add a new object inside the array:
```json
{
  "id": 5,
  "title": "Project Name",
  "description": "Short explanation of what you built and why.",
  "image": "https://images.unsplash.com/...", // Or local path inside public/
  "category": "DevOps", // DevOps, Cloud, or CI/CD
  "tags": ["Kubernetes", "AWS", "Helm"],
  "github": "https://github.com/...",
  "demo": "https://..." // Optional: Leave empty if no demo exists
}
```

### 2. Update Skills (`src/data/skills.json`)
Add skills to existing categories or define a new category:
```json
{
  "category": "Containers & Orchestration",
  "skills": [
    { "name": "Docker", "level": 90, "icon": "SiDocker", "details": "Dockerfiles, volumes, networks" }
  ]
}
```
*Note: The icon names correspond to React Icons. We support Simple Icons (`Si`), Font Awesome (`Fa`), Feather Icons (`Fi`), and HeroIcons (`Hi`). Search icons at [react-icons.github.io](https://react-icons.github.io/react-icons/).*

### 3. Update Certifications (`src/data/certifications.json`)
Add credentials:
```json
{
  "id": 4,
  "title": "AWS Certified Developer",
  "issuer": "Amazon Web Services",
  "date": "Earned: Nov 2026",
  "credentialId": "AWS-DEV-9999",
  "verifyUrl": "https://aws.amazon.com/verification",
  "icon": "SiAmazonaws"
}
```

### 4. Update Resume Download PDF
Replace the placeholder file `/public/resume.pdf` with your actual resume PDF. Keep the filename as `resume.pdf` so the download links continue working.

---

## ✉️ Setting Up EmailJS (For Contact Form)

To make your contact form send actual emails to your inbox:
1. Register for a free account at [EmailJS](https://www.emailjs.com/).
2. Add a **Email Service** (e.g. Gmail). Copy the **Service ID**.
3. Create an **Email Template** (how the email should look). Copy the **Template ID**.
4. In your Account settings, find your **Public Key**.
5. Paste these keys into the `.env` file in the root folder.
6. Restart the development server. The contact form will now deliver messages!
```
