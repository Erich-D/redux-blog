import { Container } from 'react-bootstrap';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ExplorePage from './pages/explorepage/ExplorePage';
import FeedPage from './pages/feedpage/FeedPage';
import LoginPage from './pages/loginpage/LoginPage';
import UserPage from './pages/userpage/UserPage';
import RegistrationPage from './pages/registrationpage/RegistrationPage';
import TestPage from './pages/testpage/TestPage';

function App() {
  return (
    <Container fluid className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
