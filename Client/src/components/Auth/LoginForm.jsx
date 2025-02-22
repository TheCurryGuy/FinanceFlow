import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Envelope, LockFill } from 'react-bootstrap-icons'; // Import icons

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector((state) => state.auth.error);
    const isLoading = useSelector((state) => state.auth.loading);

    const onSubmit = async (data) => {
        dispatch(loginUser(data)).then(() => {
            navigate('/');
        });
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto"> {/* Adjusted breakpoints */}
                    <div className="bg-dark text-white p-4 p-sm-5 rounded-4 shadow-lg"> {/* Responsive padding */}
                        <h2 className="text-center mb-4 mb-sm-5 display-6 fw-bold">Login to FinanceFlow</h2>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3 mb-sm-4" controlId="formBasicEmail">
                                <Form.Label className="text-white fs-6 fs-sm-5">Email address</Form.Label> {/* Responsive font size */}
                                <div className="d-flex align-items-center">
                                    <Envelope className="me-2 flex-shrink-0" size={20} />
                                    <Form.Control
                                        {...register('email', { required: 'Email is required' })}
                                        type="email"
                                        placeholder="Enter email"
                                        isInvalid={!!errors.email}
                                        className="bg-dark text-white"
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid" className="fs-sm">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 mb-sm-4" controlId="formBasicPassword">
                                <Form.Label className="text-white fs-6 fs-sm-5">Password</Form.Label> {/* Responsive font size */}
                                <div className="d-flex align-items-center">
                                    <LockFill className="me-2 flex-shrink-0" size={20} />
                                    <Form.Control
                                        {...register('password', { required: 'Password is required' })}
                                        type="password"
                                        placeholder="Password"
                                        isInvalid={!!errors.password}
                                        className="bg-dark text-white"
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid" className="fs-sm">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {authError && (
                                <Alert variant="danger" className="text-center fs-sm">
                                    {authError.error || 'Login Failed'}
                                </Alert>
                            )}

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 py-2 py-sm-3 fs-5 rounded-3 fw-bold" // Responsive padding
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form>
                        <div className="mt-3 mt-sm-4 text-center fs-sm">
                            <Link to="/register" className="text-white text-decoration-underline">
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}