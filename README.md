# EcoScope — Dashboard di monitoraggio ambientale

Dashboard interattiva per la visualizzazione di dati di qualità dell'aria urbana, costruita con **React** e **Next.js**.

Progetto dimostrativo realizzato per approfondire lo stack frontend moderno (componenti riutilizzabili, gestione dello stato, data visualization, design responsive) in vista di ruoli da Frontend Developer.

## Funzionalità

- Selezione di stazioni di monitoraggio su una mappa interattiva (SVG) e da un elenco laterale
- Visualizzazione dell'indice di qualità dell'aria (AQI) in tempo reale con codifica colore per livello
- Grafici di trend (24h) per AQI, temperatura e umidità con [Recharts](https://recharts.org/)
- Layout completamente responsive (desktop, tablet, mobile)
- Dati simulati in modo deterministico (nessuna API esterna richiesta per l'esecuzione)

## Stack tecnico

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Recharts** per la data visualization
- **lucide-react** per le icone
- Font self-hosted (`@fontsource/fraunces`, `@fontsource/ibm-plex-sans`) — nessuna chiamata a servizi esterni

## Struttura del progetto

```
app/
  layout.js        # layout globale, font, metadata
  page.js          # entry point della home
  globals.css      # design tokens e stili globali
components/
  Dashboard.jsx    # componente principale, gestisce stato e layout
  StationMap.jsx   # mappa interattiva delle stazioni (SVG)
  TrendChart.jsx   # grafico di trend riutilizzabile
lib/
  data.js          # generazione dati mock deterministici
```

## Avvio in locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Possibili sviluppi futuri

- Integrazione con API reali di qualità dell'aria (es. OpenAQ)
- Persistenza dati e storico su database
- Test con Jest / React Testing Library
