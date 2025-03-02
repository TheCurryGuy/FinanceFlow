import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { Navbar, Nav, Container, Row, Col, NavDropdown } from 'react-bootstrap';
import { HouseDoor, Wallet, GraphUp, BoxArrowRight } from 'react-bootstrap-icons';

// --- Component Imports (Organized by Directory) ---
import LandingPage from './components/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm'; // Auth components grouped
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import BudgetTracker from './components/BudgetTracker';
import BudgetForm from './components/BudgetForm';
import FinancialInsights from './components/FinancialInsights';
import GoalProgress from './components/GoalProgress';
import GoalForm from './components/GoalForm';
import ExportButton from './components/ExportButton';
import SharedExpenses from './components/SharedExpenses'; // Dashboard components grouped


// --- Constants ---
const APP_TITLE = "FinanceFlow";
const DASHBOARD_ROUTES = ["/dashboard", "/budgets", "/reports"];

// --- Helper Functions ---
const renderAuthenticatedRoutes = () => (
    <>
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
    </>
);

// --- Page Components (for top-level routes) ---
const BudgetsPage = () => (
    <div>
        <BudgetTracker />
        <br />
        <GoalProgress />
    </div>
);

const ReportsPage = () => (
    <FinancialInsights />
);

// --- Layout Components ---

const AppNavbar = ({ isAuthenticated, userEmail, handleLogout }) => (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm border-bottom border-dark">
        <Container fluid="xxl">
            <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
                <Wallet className="text-primary" size={28} />
                {APP_TITLE}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-nav" />

            <Navbar.Collapse id="main-nav" className="justify-content-end">
                <Nav>
                    {isAuthenticated ? (
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
);

// --- Dashboard Sub-Layout ---
const DashboardSidebar = () => (
    <div className="d-flex flex-column gap-4">
        <ExpenseForm />
        <GoalProgress />
        <div className="d-grid gap-2">
            <ExportButton type="pdf" />
            <ExportButton type="csv" />
        </div>
    </div>
);
const DashboardMainContent = () => (
        <div className="d-flex flex-column gap-4">
            <Dashboard />
            <Row className="g-4">
                <Col xl={8}>
                    <FinancialInsights /><br />
                    <SharedExpenses /><br />
                    <BudgetForm />
                </Col>
                <Col xl={4}>
                    <BudgetTracker />
                    <GoalForm />
                </Col>
            </Row>
        </div>
    );

const DashboardLayout = () => (
    <Row className="g-4">
        <Col xxl={3} lg={4} className="order-lg-1">
            <DashboardSidebar />
        </Col>
        <Col xxl={9} lg={8} className="order-lg-2">
           <DashboardMainContent/>
        </Col>
    </Row>
);

const CustomFooter = () => (
    <footer className="bg-dark border-top border-secondary mt-auto py-3">
        <Container fluid="xxl">
            <Row className="text-center text-md-start">
                <Col md={6}>
                    <p className="text-white text-decoration-none mb-0">
                        Stay financially ahead with {APP_TITLE}
                    </p>
                </Col>
                <Col md={6} className="mt-3 mt-md-0 text-md-end">
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-md-end">
                        <Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link>
                        <Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link>
                        <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
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
        <div className="d-flex flex-column min-vh-100 bg-dark text-white">
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