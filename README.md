# EcoScope — Environmental Monitoring Dashboard

Interactive dashboard for visualizing urban air quality data, built with **React** and **Next.js**.

Demo project developed to deepen my knowledge of the modern frontend stack (reusable components, state management, data visualization, responsive design) in preparation for Frontend Developer roles.

## Features

* Selection of monitoring stations on an interactive map (SVG) and from a sidebar list
* Real-time air quality index (AQI) visualization with color coding by severity level
* 24-hour trend charts for AQI, temperature, and humidity using [Recharts](https://recharts.org/)
* Fully responsive layout (desktop, tablet, mobile)
* Deterministically simulated data (no external API required to run the project)

## Tech Stack

* **Next.js 16** (App Router)
* **React 19**
* **Tailwind CSS 4**
* **Recharts** for data visualization
* **lucide-react** for icons
* Self-hosted fonts (`@fontsource/fraunces`, `@fontsource/ibm-plex-sans`) — no external service requests

## Project Structure

```text
app/
  layout.js        # global layout, fonts, metadata
  page.js          # home entry point
  globals.css      # design tokens and global styles
components/
  Dashboard.jsx    # main component, handles state and layout
  StationMap.jsx   # interactive station map (SVG)
  TrendChart.jsx   # reusable trend chart
lib/
  data.js          # deterministic mock data generation
```

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Potential Future Developments

* Integration with real air quality APIs (e.g. OpenAQ)
* Data persistence and historical data storage using a database
* Testing with Jest / React Testing Library

