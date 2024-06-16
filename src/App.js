import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./component/Onboarding/SignIn.jsx";
import SignUp from "./component/Onboarding/SignUp.jsx";
import logo from "./logo.svg"; // Assuming you have a logo to use somewhere
import ViewerMapComponent from "./component/Map/TravelerCompanion/index.jsx";
import MapComponent from "./component/Map/Traveler/index.jsx";
import CreateTrip from "./component/Trip/index.jsx";
import ProfilePage from "./component/ProfilePage/index.jsx";
import ShareTrip from "./component/Trip/Share Trip/index.jsx";
import FeedbackForm from "./component/Feedback/index.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/view-trip/:tripId" element={<ViewerMapComponent />} />
          <Route path="/view-trip" element={<MapComponent />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/share-trip" element={<ShareTrip />} />
          <Route path="/feedback-trip" element={<FeedbackForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
