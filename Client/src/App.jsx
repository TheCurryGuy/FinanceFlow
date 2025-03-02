import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { Navbar, Nav, Container, Button, Row, Col, NavDropdown } from 'react-bootstrap';
import { HouseDoorFill, WalletFill, GraphUp, PeopleFill, BoxArrowRight, CashStack, ClipboardData, Bullseye } from 'react-bootstrap-icons';

// Component Imports -  Organized by Category
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


// --- Constants ---
const APP_TITLE = "FinanceFlow";
const DASHBOARD_ROUTES = ["/dashboard", "/budgets", "/reports"];

// --- Helper Functions ---
const renderAuthenticatedRoutes = () => (
  <>
    <Route path="/dashboard" element={<DashboardLayout />} />
    <Route path="/budgets" element={<BudgetsLayout />} />
    <Route path="/reports" element={<ReportsLayout />} />
  </>
);


// --- Sub-Components (Layout Components) ---

const AppNavbar = ({ isAuthenticated, userEmail, handleLogout }) => (
  <Navbar expand="lg" variant="dark" className="shadow-sm py-3" style={{ backgroundColor: '#343a40' }}>
    <Container fluid="xxl">
      <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2 text-primary">
        <WalletFill className="text-info" size={28} />
        {APP_TITLE}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="main-nav" className="border-0">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>

      <Navbar.Collapse id="main-nav" className="justify-content-end">
        <Nav className="ms-auto align-items-lg-center">
          {isAuthenticated ? (
            <NavDropdown
              title={<span className="d-flex align-items-center text-light"><GraphUp className="me-2" />{userEmail || 'Account'}</span>}
              align="end"
              menuVariant="dark"
              id="account-nav-dropdown"
              className='rounded-pill'
            >
              <NavDropdown.Item as={Link} to="/dashboard" className="d-flex align-items-center">
                <HouseDoorFill className="me-2" />Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/budgets" className="d-flex align-items-center">
                <CashStack className="me-2" />Budgets & Goals
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reports" className="d-flex align-items-center">
                <ClipboardData className="me-2" />AI Report
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center">
                <BoxArrowRight className="me-2" />Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light me-2 rounded-pill px-3">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="btn btn-primary rounded-pill px-3">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const Sidebar = () => (
  <div className="d-flex flex-column gap-4 p-3 bg-light rounded shadow-sm h-100">
    <ExpenseForm />
    <GoalProgress />
    <div className="d-grid gap-2">
      <ExportButton type="pdf" />
      <ExportButton type="csv" />
    </div>
  </div>
);

const BudgetsLayout = () =>(
    <div className="bg-light rounded shadow-sm p-4">
        <h2>Budgets & Goals</h2>
        <BudgetTracker />
        <br />
        <GoalProgress />
    </div>
);

const ReportsLayout = () =>(
    <div className="bg-light rounded shadow-sm p-4">
        <h2>Financial Insights</h2>
        <FinancialInsights />
    </div>

);

const DashboardLayout = () => (
    <Row className="g-4">
      <Col xxl={3} lg={4} className="order-lg-1">
        <Sidebar />
      </Col>

      <Col xxl={9} lg={8} className="order-lg-2">
        <div className="d-flex flex-column gap-4">
            <div className="bg-light rounded shadow-sm p-4">
               <h2>Dashboard Overview</h2>
                <Dashboard />
            </div>

          <Row className="g-4">
            <Col xl={8}>
                <div className="bg-light rounded shadow-sm p-4 mb-4">
                    <FinancialInsights />
                </div>

                <div className="bg-light rounded shadow-sm p-4 mb-4">
                  <SharedExpenses />
                </div>
              <div className="bg-light rounded shadow-sm p-4">
                 <BudgetForm />
              </div>

            </Col>
            <Col xl={4}>
              <div className="bg-light rounded shadow-sm p-4 mb-4">
                <BudgetTracker />
              </div>

              <div className="bg-light rounded shadow-sm p-4">
                 <GoalForm />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );




const CustomFooter = () => (
    <footer className="bg-secondary text-white py-4 mt-auto">
        <Container fluid="xxl">
            <Row className="text-center text-md-start">
                <Col md={6}>
                    <p className="mb-0">
                        Stay financially ahead with <span className="fw-bold">{APP_TITLE}</span>
                    </p>
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                    <div className="d-flex justify-content-center justify-content-md-end gap-3">
                        <Link to="/privacy" className="text-light">Privacy Policy</Link>
                        <Link to="/terms" className="text-light">Terms of Service</Link>
                        <Link to="/contact" className="text-light">Contact</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
);


// --- Main App Component ---

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => dispatch(logout());

  const showCustomFooter = isAuthenticated && DASHBOARD_ROUTES.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#212529' }}>
      <AppNavbar isAuthenticated={isAuthenticated} userEmail={userEmail} handleLogout={handleLogout} />

      <Container fluid="xxl" className="flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/dashboard" />} />

          {isAuthenticated && renderAuthenticatedRoutes()}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>

      {showCustomFooter && <CustomFooter />}
    </div>
  );
}

export default App;