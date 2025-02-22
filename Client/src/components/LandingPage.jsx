import React from 'react';
import { Link } from 'react-router-dom';
import viewImage from "../assets/view.png"; // Make sure this path is correct
import { Container, Row, Col, Button, Card } from 'react-bootstrap'; // Import Bootstrap components

// Since we're switching to Bootstrap, we'll replace Heroicons with Bootstrap Icons.
// You'll need to install react-bootstrap-icons:  npm install react-bootstrap-icons
import { CurrencyDollar, GraphUp, ShieldFillCheck, BarChartLineFill, PhoneFill, FileEarmarkArrowDownFill } from 'react-bootstrap-icons';


function LandingPage() {
  return (
    <div className="bg-dark text-white min-vh-100">
      {/* Hero Section */}
      <section className="py-5 py-md-5 px-4">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              {/* Removed the gradient background, as it's harder to achieve with standard Bootstrap */}
              <h1 className="display-4 fw-bold mb-4">
                Transform Your <span className="text-primary">Financial Future</span>
              </h1>
              <p className="lead mb-4">
                Smart budgeting, effortless tracking, and financial insights that help you grow.
              </p>
              <div className="d-flex flex-column align-items-center gap-3 mt-4 text-center">
                <div className="position-relative w-40 d-flex justify-content-center">
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-semibold gradient-hover w-100 w-md-auto"
                  >
                    Start Your Journey
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark fs-6 w-md-40">
  <span className="d-none d-md-inline">Lifetime Access</span>
  <span className="d-inline d-md-none" style={{ fontSize: "14px", whiteSpace: "normal", wordWrap: "break-word" }}>
    Lifetime Access
  </span>
</span>



                  </Link>
                </div>
                <p className="text-body-tertiary small mt-2">
                  Trusted by the world's leading financial experts
                </p>
              </div>



              <div className="mt-5 rounded overflow-hidden border">
                {/* Removed the gradient overlay - easier to manage without custom CSS */}
                <img
                  src={viewImage}
                  alt="App dashboard preview"
                  className="img-fluid" // Bootstrap class for responsive images
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold">
                Everything You Need for Financial Success
              </h2>
              <p className="lead">
                Powerful tools combined with intuitive design to help you master your money.
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              { icon: CurrencyDollar, title: 'Expense Tracking', desc: 'Easily track your expenses and categorize them automatically.' },
              { icon: GraphUp, title: 'Budgeting', desc: 'Set budgets and stay on track with your spending.' },
              { icon: ShieldFillCheck, title: 'Financial Goals', desc: 'Set and track your financial goals, like saving for a house or car.' },
              { icon: BarChartLineFill, title: 'Advanced Insights', desc: 'Custom AI generated Financial insights at your fingertips.' },
              { icon: PhoneFill, title: 'Mobile App', desc: 'Access your finances on the go with our platform responsiveness.' },
              { icon: FileEarmarkArrowDownFill, title: 'Export Expenses', desc: 'Download your expenses report in CSV / PDF formats.' },
            ].map((feature, idx) => (
                <Col key={idx} md={6} lg={4}>
                <Card bg="dark" text="white" className="h-100 border">
                    <Card.Body>
                        <div className="mb-3">
                          <feature.icon size={48} className="text-primary" />
                        </div>
                        <Card.Title as="h3" className='text-white'>{feature.title}</Card.Title>
                        <Card.Text>{feature.desc}</Card.Text>
                    </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center bg-primary">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold text-white mb-4">
                Ready to Transform Your Finances?
              </h2>
              <p className="lead text-white mb-4">
                Join thousands who've already taken control of their financial future
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Button as={Link} to="/register" variant="light" size="lg" className="me-sm-2 text-primary">
                  Start Your Journey Now
                </Button>
                <Button as={Link} to="/demo" variant="outline-light" size="lg">
                  Watch Demo Video
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

        {/* Footer */}
        <footer className="bg-dark py-4">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="text-white mb-2">
                            © {new Date().getFullYear()} FinanceFlow. All rights reserved.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="#" className="text-white">Privacy</a>
                            <a href="#" className="text-white">Terms</a>
                            <a href="#" className="text-white">Security</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    </div>
  );
}

export default LandingPage;