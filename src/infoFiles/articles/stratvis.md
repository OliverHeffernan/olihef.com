# StratVis

## Snapshot

StratVis is a full-stack web app I built to turn stratospheric/satellite imagery into practical environmental insight.

Instead of only showing raw imagery, the product helps users identify:

- current environmental dangers,
- potential threats,
- positive opportunities worth preserving or scaling.

I designed and delivered the project solo, including product direction, frontend, backend, data persistence, and deployment.

![StratVis analysis view](/stratvis-screenshots/analysisView.png)

*Analysis view with map overlays and AI-generated points of interest.*

---

## Why I built it

Satellite imagery contains valuable information, but extracting decisions from it is often slow and manual.

I wanted to build a tool that made this workflow faster and more actionable: select an area, run analysis, and immediately see environmental insights in geographic context.

---

## What I delivered

### 1) Map-first analysis workflow

Users select an area directly on an interactive map, run analysis, and receive map-linked results.

![StratVis area selection](/stratvis-screenshots/selectView.png)

*Map selection flow for defining analysis bounds.*

### 2) Clear AI-generated outputs

The app generates actionable insights in the following formats:
- **Points of Interest (POIs):** Markers on the map with specific insights about environmental conditions, risks, or opportunities.
- **Summary report:** A concise textual summary of the overall environmental situation in the selected area
- **Metrics:** Quantitative and qualitative metrics that provide a quick overview of key environmental factors.

![StratVis generated report](/stratvis-screenshots/report.png)

*Generated output shown in the analysis experience.*

### 3) Session history for revisit and comparison

Users can return to previous analysis sessions to review past outputs.

![StratVis session history](/stratvis-screenshots/sessionView.png)

*Session/snapshot history view.*

---

## Tech stack

- **Frontend:** Vue.js, TypeScript, MapLibre GL
- **Backend:** Java, Spring Boot
- **Database:** SQLite
- **External services:** OpenAI, Geoapify, ArcGIS imagery tiles
- **Deployment:** Docker + Nginx, self-hosted on Raspberry Pi 4 (8GB), exposed via Cloudflare Tunnel

---

## Timeline

- **13 Apr 2026:** Project started
- **15 Apr 2026:** MVP complete
- **16-18 Apr 2026:** POIs, map-first flow, persistence, and product polish
- **19 Apr 2026:** Live deployment
- **20 Apr 2026:** Reached current complete state (now feedback-driven improvements)

---

## What this project shows about me

- I can ship complete products quickly, not just isolated features.
- I can bridge product thinking with implementation details.
- I am comfortable owning frontend, backend, data, and deployment end-to-end.
- I can integrate AI into real user workflows, not only demos.

---

## Notes

For deeper technical implementation details (architecture decisions, API specifics, testing, and internals), see the project README files in the StratVis repository.
