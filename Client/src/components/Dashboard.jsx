import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSocket } from '../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../features/expense/expenseSlice';
import { Card, ListGroup, Row, Col, Alert } from 'react-bootstrap'; // Import

Chart.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expense.expenses);
    const expenseStatus = useSelector(state => state.expense.status);
  useEffect(() => {
    if (expenseStatus === 'idle') {
      dispatch(fetchExpenses());
    }
  }, [expenseStatus, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on('expenseUpdate', (newExpense) => {
        dispatch(fetchExpenses()); // Re-fetch *all* expenses
      });
    }
    return () => {
      if (socket) {
        socket.off('expenseUpdate');
      }
    };
  }, [socket, dispatch]);

    const chartData = {
        labels: expenses.map(e => e.category),
        datasets: [{
            data: expenses.map(e => e.amount),
            backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'], // Bootstrap colors
            hoverOffset: 4,
        }],
    };
    if (expenseStatus === 'loading') {
        return <Alert variant="info">Loading expenses...</Alert>;
      }
    
      if (expenseStatus === 'failed') {
        return <Alert variant="danger">Error fetching expenses.</Alert>;
      }
    return (
        <Row className="g-3">
            <Col md={8}>
                <Card bg="dark" text="white" className='border border-white'>
                    <Card.Body>
                        <Card.Title>Recent Expenses</Card.Title>
                        <ListGroup bg= "secondary" variant="flush">
                            {expenses.length === 0 ? (
                                <ListGroup.Item bg="dark" text="white">No expenses yet.</ListGroup.Item>
                            ) : (
                                expenses.map(expense => (
                                    <ListGroup.Item key={expense._id} bg="dark" text="white" className="d-flex justify-content-between align-items-center bg-secondary">
                                        <div>
                                            <div>{expense.description}</div>
                                            <small className="text-muted">{expense.category}</small>
                                        </div>
                                        <span>${expense.amount}</span>
                                    </ListGroup.Item>
                                ))
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card bg="dark" text="white" className='border border-white'>
                    <Card.Body>
                        <Card.Title>Spending Breakdown</Card.Title>
                        <Doughnut data={chartData} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}