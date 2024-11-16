import { APIProvider } from "@vis.gl/react-google-maps";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./screens/Landing";
import Map from "./screens/Map";

function App() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing.");
    return <div>Error: Google Maps API key is missing!</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/map"
          element={
            <APIProvider apiKey={apiKey}>
              <Map />
            </APIProvider>
          }
        />
      </Routes>
      <Toaster  
     position="top-right" /> 
    </Router>
  );
}

export default App;
