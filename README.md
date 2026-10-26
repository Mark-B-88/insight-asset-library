# Insight Asset Library

A mobile-first enterprise data catalog built to help users discover, preview, and organize analytics resources (KPIs, Layouts, Storyboards) to drive business insights.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4 (Strict utility classes, no pre-built UI component libraries)
* **State Management:** Redux Toolkit
* **Language:** TypeScript

## Architecture & The 80/20 Split
This project balances frontend UI development with simulated backend integration:
* **Frontend (80%):** A responsive, accessible UI utilizing Redux Toolkit to manage complex modal states, active filters, and search queries globally.
* **Backend (20%):** Utilizes Next.js API Routes (`/api/assets`) to serve mock data. The frontend fetches this data asynchronously on mount, handling loading states to simulate real-world network latency.

## Documented Assumptions & Ambiguity Handling

The requirements provided high-level directional details to emulate real-world ambiguity. Below is how those gaps were addressed:

### 1. The "Request" Workflows
A user story was mentioned for requesting access to restricted data, while the wireframe included a global "+ Request" button in the header. 
* **Global Request (New Assets):** I assumed the global button is for ticketing the data engineering team to build entirely new assets. This triggers a dedicated `GlobalRequestModal`.
* **Access Request (Restricted Data):** I assumed gated assets require business justification to view underlying data. If an asset has `hasAccess: false`, the standard modal details are replaced with a justification form.
* *Limitation Note:* Without a live database, form submissions simulate network latency via timeouts and log the payloads to the browser console to demonstrate state management and UX loading indicators.

### 2. Action Buttons (Favorite & Copy Link)
The wireframe includes buttons to "Favorite Asset" and "Copy Link" within the asset modal.
* *Limitation Note:* Because there is no authenticated user session or persistent backend state, clicking these buttons currently acts as a UX placeholder. In a production environment, "Favorite" would dispatch a `POST` request to a user-preferences endpoint, and "Copy Link" would utilize the standard `navigator.clipboard` API based on the dynamic route ID.

### 3. Data Schema Modeling
No strict data schema was provided. I engineered a polymorphic TypeScript interface where a `BaseAsset` contains universal traits (id, name, description, date, access flags), which is then extended by specific types (`KPIAsset`, `LayoutAsset`, etc.) to hold the unique metadata required by the dynamic modal views.

### 4. Filtering Logic
Assumminig the category tabs (Featured, KPI, Layouts, Storyboards) act as strict data filters that can be layered simultaneously with the text search input, they are not meant for hard navigational route changes. 

## Running Locally

1. `npm install`
2. `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
