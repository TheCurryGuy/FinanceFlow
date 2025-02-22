import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap'; // Import

const MobileMenu = () => {
  const [show, setShow] = useState(false); // Use show and setShow
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} className="d-lg-none" />
      <Offcanvas show={show} onHide={handleClose} responsive="lg" bg='dark' text='white' placement="end">
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>FinanceFlow</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          <Nav className="flex-grow-1 pe-3">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/" onClick={handleClose} className='text-white'>Dashboard</Nav.Link>
                <Nav.Link onClick={() => { /* Your logout logic here */ }} className='text-white'>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleClose} className='text-white'>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={handleClose} className='text-white'>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileMenu;