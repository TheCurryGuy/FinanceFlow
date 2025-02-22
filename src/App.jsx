import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Wallet } from 'react-bootstrap-icons';

// Components
import LandingPage from './components/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

function App() {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm border-bottom border-dark">
        <Container fluid="xxl">
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            <Wallet className="text-primary" size={28} />
            FinanceFlow
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-nav" />
          
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link onClick={() => { /* handle logout */ }}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="text-white hover-primary">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="text-white hover-primary">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid="xxl" className="flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>

      <footer className="bg-dark border-top border-dark mt-auto py-4">
        <Container fluid="xxl">
          <Row className="text-center text-md-start">
            <Col md={6}>
              <p className="text-muted mb-0">
                Empowering your financial journey with smart insights
              </p>
            </Col>
            <Col md={6} className="mt-3 mt-md-0 text-md-end">
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-md-end">
                <Link to="/privacy" className="text-muted">Privacy Policy</Link>
                <Link to="/terms" className="text-muted">Terms of Service</Link>
                <Link to="/contact" className="text-muted">Contact</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
