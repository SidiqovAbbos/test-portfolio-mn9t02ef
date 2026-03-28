# Project Requirements: Personal Portfolio Website

## Overview
Build a modern, single-page personal portfolio website for a freelance software developer named **Alex Chen**. The site should showcase their work, skills, and provide a way for potential clients to get in touch. Clean, minimal design with smooth animations.

## Pages
This is a **single-page** site with scroll-based sections (use anchor links in the nav, not React Router):

### 1. Hero Section
- Full-viewport height
- Large heading: "Hi, I'm Alex Chen"
- Subtitle: "Full-Stack Developer & UI Designer"
- Brief intro paragraph (2-3 sentences)
- Two CTA buttons: "View My Work" (scrolls to Projects) and "Contact Me" (scrolls to Contact)
- Subtle gradient background (indigo to purple)

### 2. About Section
- Photo placeholder on the left (use https://placehold.co/400x400)
- Bio text on the right (3-4 paragraphs about experience, passion, approach)
- Skills grid below: React, TypeScript, Node.js, Python, Figma, AWS (show as pill badges)

### 3. Projects Section
- Grid of 4 project cards (2 columns on desktop, 1 on mobile)
- Each card has: thumbnail image (placeholder), project title, short description, tech tags, "View Project" link
- Mock projects:
  1. "TaskFlow" - Project management dashboard (React, TypeScript, Tailwind)
  2. "ShopEase" - E-commerce platform (Next.js, Stripe, PostgreSQL)
  3. "WeatherNow" - Weather app with maps (React Native, OpenWeather API)
  4. "CodeBlog" - Developer blog (Astro, MDX, Tailwind)

### 4. Contact Section
- Contact form with fields: Name, Email, Message
- Form doesn't need to actually submit — just show a success toast/message on "submit"
- Social links: GitHub, LinkedIn, Twitter (use # as href)
- Email: alex@example.com

### 5. Footer
- Copyright text
- Back to top link

## Design Preferences
- **Color scheme:** Dark mode — dark gray/slate background (#0f172a), white text, indigo/purple accents
- **Typography:** Clean sans-serif (system fonts are fine)
- **Animations:** Subtle fade-in on scroll for sections (CSS only, no animation libraries)
- **Style:** Minimal, professional, modern — inspired by linear.app and vercel.com

## Features
- Sticky navigation bar with section links
- Smooth scroll behavior
- Mobile hamburger menu
- Hover effects on project cards (slight scale + shadow)
- Form validation (required fields, email format)
