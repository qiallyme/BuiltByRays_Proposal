# BuiltByRays™ Executive Growth Partnership Proposal

A professional, mobile-optimized proposal application for BuiltByRays™ executive consulting services.

## Features

- 📱 **Mobile-First Design** - Optimized for busy executives on the go
- 🎥 **Interactive Video Content** - Hero video with expandable media section
- 📊 **Dynamic Calculations** - Real-time proposal adjustments and ROI projections
- 📝 **Integrated Forms** - Zoho form integration for client feedback
- 💳 **Payment Integration** - Seamless payment processing
- 🎨 **Professional UI** - Glass morphism effects and smooth animations

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Forms**: Zoho Forms Integration
- **Deployment**: Netlify-ready

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## MP3 Compression

This project includes an automated MP3 compression tool to ensure audio files stay under 25MB for optimal web performance.

### Usage

```bash
npm run compress-mp3
```

The script will:
- Scan all MP3 files in the `public/` directory
- Check if any files exceed 25MB
- Automatically compress oversized files using FFmpeg
- Create backups of original files (with `-original` suffix)
- Try multiple bitrates (96k, 80k, 64k) to achieve optimal compression
- Replace original files with compressed versions

### Requirements

- FFmpeg must be installed and available in your system PATH
- Node.js 18+ for running the compression script

### Manual Compression

If you need to compress a specific file manually:

```bash
ffmpeg -i "input.mp3" -b:a 96k -ar 44100 "output.mp3"
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ConfigPanel.tsx  # Assumptions configuration
│   ├── Footer.tsx       # Professional footer
│   ├── HeroVideo.tsx    # Video hero section
│   ├── NextSteps.tsx    # Next steps section
│   ├── PaymentEmbed.tsx # Payment integration
│   ├── ProposalStats.tsx # ROI calculations
│   ├── ScheduleTable.tsx # Schedule preview
│   └── ZohoFormEmbed.tsx # Client feedback form
├── config.ts           # Configuration and constants
├── lib/                # Utility functions
└── styles.css          # Global styles
```

## Powered By

**QiSuite™** - Executive Growth Partnership Platform  
**QiAlly LLC** - www.qially.me

---

*Built with ❤️ for executive excellence*
