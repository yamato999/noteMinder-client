import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";

//components
import SwipeDrawer from "./SwipeDrawer";
import Notes from "./notes/Notes";
import Login from "./login/LoginPage";
import LandingPage from "./landing/LandingPage";

const Home = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/*" // Маршрут для всех остальных путей
            element={
              <Box style={{ display: "flex", width: "100%" }}>
                <SwipeDrawer />
                <Routes>
                  <Route path="/notes" element={<Notes />} />
                </Routes>
              </Box>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
