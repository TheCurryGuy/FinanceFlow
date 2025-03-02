import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, updateBudget } from '../features/budget/budgetSlice';
import BudgetFormModal from '../modals/BudgetFormModal';
import { useSocket } from '../context/SocketContext';
import { Button, ProgressBar, Card, Alert } from 'react-bootstrap'; // Import

export default function BudgetTracker() {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budget.budgets);
  const budgetStatus = useSelector(state => state.budget.status);
  const budgetError = useSelector(state => state.budget.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { socket } = useSocket();
    const [localUpdate, setLocalUpdate] = useState(false)


  //Listen to budget changes.
  useEffect(() => {
    if (socket) {
        socket.on('budgetUpdate', (updatedBudget) => {
            dispatch(updateBudget(updatedBudget));
        });
    }

    return () => {
        if (socket) {
            socket.off('budgetUpdate');
        }
    };
}, [socket, dispatch]);

  useEffect(() => {
      dispatch(fetchBudgets());
  }, [dispatch, localUpdate]);

    const handleShow = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);


  if (budgetStatus === 'loading') {
    return <Alert variant="info">Loading budgets...</Alert>; // Use Alert for loading
  }

  if (budgetStatus === 'failed') {
        return <Alert variant="danger">Error: {budgetError?.error || 'Failed to load budgets'}</Alert>; // Use Alert for error
  }

  return (
    <Card bg="dark" text="white" className="mb-4 border border-white">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title as="h2">Budgets</Card.Title>
          <Button variant="primary" onClick={handleShow}>
            Add Budget
          </Button>
        </div>
        <BudgetFormModal show={isModalOpen} onHide={handleClose} />

        {budgets.length === 0 ? (
          <p>No budgets yet. Add a budget to start tracking!</p>
        ) : (
          budgets.map((budget) => (
            <div key={budget._id} className="mb-3">
              <strong className="text-white">{budget.category}</strong>
              <ProgressBar
                now={(budget.spent / budget.limit) * 100}
                label={`$${budget.spent} / $${budget.limit}`}
                className="mb-2"
                variant={budget.spent <= budget.limit ? "success" : "danger"} // Change color based on status
              />
               <p className={budget.spent <= budget.limit ? "text-success" : "text-danger"}>
                Remaining: ${budget.limit - budget.spent}
              </p>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}