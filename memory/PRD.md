# Softogram Website - PRD

## Original Problem Statement
Build a complete, modern, fully responsive website for a software company called "Softogram" with:
- Brand Identity: Deep navy blue (#0A0F2C) primary, electric blue (#3B82F6) accent
- Tagline: "Your idea. Our code. Delivered."
- Sections: Hero, Stats, Services, Pricing, Portfolio, Testimonials, Why Choose Us, Contact, Footer
- Contact form with SendGrid email integration
- WhatsApp floating button

## User Personas
1. **SMB Owners** - Small/medium business owners in India looking for software development services
2. **Startup Founders** - Tech-savvy founders needing custom web applications
3. **E-commerce Merchants** - Business owners looking for online stores

## Core Requirements (Static)
- Responsive design for all devices
- Smooth scroll navigation
- Animated sections with scroll reveal
- Contact form with email notification
- WhatsApp quick contact option
- Professional, trustworthy design

## Architecture
- **Frontend**: React 19 with Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: FastAPI with MongoDB
- **Email**: SendGrid (configurable via environment variables)

## What's Been Implemented
### December 2025
- [x] Full responsive website with all 9 sections
- [x] Animated hero with gradient orbs and floating code snippet
- [x] Stats counter with 4 metrics (CountUp animation)
- [x] Services bento grid (6 services)
- [x] Pricing cards (3 tiers with Growth marked popular)
- [x] Portfolio grid (3 projects with tech tags)
- [x] Testimonials marquee (3 clients)
- [x] Why Choose Us (4 features)
- [x] Contact form with SendGrid integration
- [x] WhatsApp floating button
- [x] Sticky glassmorphism navbar with mobile menu
- [x] Footer with links and social icons
- [x] Backend API: POST /api/contact

## Environment Variables
```
# Backend (.env)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDER_EMAIL=hello@softogram.com
RECIPIENT_EMAIL=hello@softogram.com
```

## Prioritized Backlog

### P0 - Critical (For Production)
- [ ] Add actual SendGrid API key for email notifications
- [ ] Update placeholder phone numbers
- [ ] Add real social media URLs

### P1 - Important
- [ ] Add SEO meta tags (title, description, OG tags)
- [ ] Add favicon and site icons
- [ ] Implement actual project links in portfolio
- [ ] Add Google Analytics integration

### P2 - Nice to Have
- [ ] Add loading states/skeleton screens
- [ ] Implement blog section
- [ ] Add cookie consent banner
- [ ] Add live chat widget (Intercom/Drift)
- [ ] Implement dark/light mode toggle

## Next Tasks
1. Configure SendGrid API key for production
2. Update contact phone number and WhatsApp number
3. Add actual social media profile URLs
4. Implement SEO optimizations
5. Add Google Analytics tracking
