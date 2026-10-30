
# TVmaze Show Gallery

## Project Description

TVmaze Show Gallery is a React single-page application that allows users to search for television shows using the TVmaze API. Users can browse search results, view show information, and explore cast members and the characters they play.

## Installation and Setup

1. Clone the repository 

2. Navigate into the project folder:
   ```bash
   cd react-tvmaze-gallery
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the local URL provided by Vite in your browser.

## React Concepts and Implementation

| Concept | Implementation |
|---|---|
| Components | App.jsx, SearchForm.jsx, ShowList.jsx, and ShowCard.jsx |
| Props | SearchForm receives the search query and event handlers; ShowCard receives show information. |
| State | useState manages the search query, shows, loading status, errors, and cast information. |
| Effects | useEffect handles API requests for show details and cast members. |
| Conditional Rendering | Displays loading messages, errors, empty results, and show information. |
| Lists and Keys | map() displays show cards and cast members using unique IDs as keys. |
| React Router | BrowserRouter, Routes, Route, Link, and useParams manage navigation. |
| API Requests | Fetch requests retrieve show and cast information from TVmaze. |

## Reflection

Building this application with React was different from using vanilla JavaScript because React manages the user interface through components and state. With vanilla JavaScript, you would need to manually update the HTML whenever search results or other information changed.

I used components to separate the search form, show cards, and show list into smaller sections. I also used useState to store information such as search results and loading messages. The useEffect hook allowed me to retrieve information from the TVmaze API when needed. React Router made it possible to navigate between the main gallery and individual show detail pages without reloading the entire website.

Overall, React helped organize the application and made it easier to manage changing data and user interactions.

## AI Assistance Disclosure

ChatGPT was used as a learning and debugging assistant during development. It helped explain React concepts, troubleshoot errors, and code improvements. I reviewed and tested the code and worked to understand how the different parts of the application function.

