
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import Login from './login/LoginPage';
import LandingPage from './landing/LandingPage'

const Home = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/landing' element={<LandingPage />} />
            <Route
              path='/*' // Маршрут для всех остальных путей
              element={
                <Box style={{ display: 'flex', width: '100%' }}>
                  <SwipeDrawer />
                  <Routes>
                    
                    <Route path='/notes' element={<Notes />} />
                    <Route path='/archive' element={<Archives />} />
                    <Route path='/delete' element={<DeleteNotes />} />
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