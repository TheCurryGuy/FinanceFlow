import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import {
  Navbar, Nav, Container, Button, Row, Col, NavDropdown
} from 'react-bootstrap';
import { HouseDoor, Wallet, GraphUp, People, BoxArrowRight } from 'react-bootstrap-icons';

// Components
import LandingPage from './components/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import BudgetTracker from './components/BudgetTracker';
import BudgetForm from './components/BudgetForm';
import FinancialInsights from './components/FinancialInsights';
import GoalProgress from './components/GoalProgress';
import GoalForm from './components/GoalForm';
import ExportButton from './components/ExportButton';
import SharedExpenses from './components/SharedExpenses';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => dispatch(logout());

  // Only show sidebar on authenticated routes except landing
  const showSidebar = isAuthenticated && location.pathname !== '/';

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
                  <NavDropdown
                    title={<><GraphUp className="me-2" />{userEmail || 'Account'}</>}
                    align="end"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item as={Link} to="/dashboard">
                      <HouseDoor className="me-2" />Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/budgets">
                      <Wallet className="me-2" />Budget & Goals
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/reports">
                      <Wallet className="me-2" />AI Report
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      <BoxArrowRight className="me-2" />Logout
                    </NavDropdown.Item>
                  </NavDropdown>
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
          
          <Route path="/login" element={
            !isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" />
          } />
          
          <Route path="/register" element={
            !isAuthenticated ? <RegisterForm /> : <Navigate to="/dashboard" />
          } />

          {/* Authenticated Routes */}
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={
                <Row className="g-4">
                  <Col xxl={3} lg={4} className="order-lg-1">
                    <div className="d-flex flex-column gap-4">
                      <ExpenseForm />
                      <GoalProgress />
                      
                      
                      <div className="d-grid gap-2">
                        <ExportButton type="pdf" />
                        <ExportButton type="csv" />
                      </div>
                    </div>
                  </Col>
                  
                  <Col xxl={9} lg={8} className="order-lg-2">
                    <div className="d-flex flex-column gap-4">
                      <Dashboard />
                      <Row className="g-4">
                        <Col xl={8}>
                          <FinancialInsights/><br/>
                          <SharedExpenses /><br/>
                          <BudgetForm />
                          
                        </Col>
                        <Col xl={4}>
                          <BudgetTracker />
                          <GoalForm />
                          
                        </Col>
                      </Row>
                      
                    </div>
                  </Col>
                </Row>
              } />

              <Route path="/budgets" element={<div><BudgetTracker /> <br/> <GoalProgress /></div>} />
              <Route path="/goals" element={<GoalProgress />} />
              <Route path="/reports" element={<FinancialInsights />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>

      <footer className="bg-dark border-top border-dark mt-auto py-4">
        <Container fluid="xxl">
          <Row className="text-center text-md-start">
            <Col md={6}>
              {/* <h5 className="mb-3">FinanceFlow</h5> */}
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
// import React from 'react';
// import { Routes, Route, Navigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import LoginForm from './components/Auth/LoginForm';
// import RegisterForm from './components/Auth/RegisterForm';
// import ExpenseForm from './components/ExpenseForm';
// import Dashboard from './components/Dashboard';
// import BudgetTracker from './components/BudgetTracker';
// import BudgetForm from './components/BudgetForm'; // Import
// import FinancialInsights from './components/FinancialInsights';
// import GoalProgress from './components/GoalProgress';
// import GoalForm from './components/GoalForm'; // Import
// import ExportButton from './components/ExportButton';
// import SharedExpenses from './components/SharedExpenses';
// import LandingPage from './components/LandingPage';
// import { logout } from './features/auth/authSlice';
// //React Bootstrap
// import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

// function App() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className="bg-dark text-white min-vh-100">
//       <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
//         <Container>
//           <Navbar.Brand as={Link} to="/" className="fw-bold">
//             $ FinanceFlow
//           </Navbar.Brand>
//           {/* Navbar.Toggle OUTSIDE MobileMenu */}
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               {isAuthenticated ? (
//                 <>
//                                     <Nav.Link className='text-white'>User Email</Nav.Link>
//                                     <Button variant="danger" onClick={handleLogout}>Logout</Button>
//                 </>
//               ) : (
//                 <>
//                                     <Nav.Link as={Link} to="/login" className='text-white'>Login</Nav.Link>
//                                     <Nav.Link as={Link} to="/register" className='text-white'>Register</Nav.Link>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* ... rest of your App.js code ... */}
//        <Container className="py-4">
//         <Routes>
//           <Route path="/" element={isAuthenticated ? (
//             <Row>
//               <Col lg={4} className="mb-4">
//                 <ExpenseForm />
//                 <BudgetTracker />
//                 <GoalProgress />
//                 <div className="mt-3 d-flex gap-2">
//                   <ExportButton type="pdf" />
//                   <ExportButton type="csv" />
//                 </div>
//               </Col>
//               <Col lg={8}>
//                 <Dashboard />
//                 <FinancialInsights />
//                 <SharedExpenses />
//               </Col>
//             </Row>
//           ) : <LandingPage />} />
//           <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
//           <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />
//         </Routes>
//       </Container>
//     </div>
//   );
// }

// export default App;