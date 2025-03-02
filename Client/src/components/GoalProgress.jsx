import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from '../features/goal/goalSlice';
import GoalFormModal from '../modals/GoalFormModal';
import { useSocket } from '../context/SocketContext';
import { Button, ProgressBar, Card, Alert } from 'react-bootstrap';

export default function GoalProgress() {
    const dispatch = useDispatch();
    const goals = useSelector(state => state.goal.goals);
    const goalStatus = useSelector(state => state.goal.status);
    const goalError = useSelector(state => state.goal.error);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { socket } = useSocket();
    const [localLoading, setLocalLoading] = useState(true);

    // Socket.IO effect (for real-time updates)
    useEffect(() => {
        if (socket) {
            socket.on('goalUpdate', () => {
                dispatch(fetchGoals());
            });
        }
        return () => {
            if (socket) {
                socket.off('goalUpdate');
            }
        };
    }, [socket, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            setLocalLoading(true);
            try {
                await dispatch(fetchGoals());
            } finally {
                setLocalLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleShow = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    if (localLoading) {
        return <Alert variant="info">Loading goals...</Alert>;
      }

    if (goalStatus === 'failed') {
         return <Alert variant="danger">Error: {goalError ? goalError.error : 'Failed to fetch goals'}</Alert>;
    }


    return (
        <Card bg="dark" text="white" className="mb-4 border border-white">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title as="h2">Financial Goals</Card.Title>
                    <Button variant="primary" onClick={handleShow}>
                        Add Goal
                    </Button>
                </div>
                <GoalFormModal show={isModalOpen} onHide={handleClose} />
                {goals.length === 0 && goalStatus !== 'loading' ? (
                    <p>No goals yet. Add a goal to start tracking!</p>
                ) : (
                    goals.map(goal => (
                        <div key={goal._id} className="mb-3">
                            <strong className='text-white'>{goal.title}</strong>
                             <ProgressBar
                                now={(goal.currentAmount / goal.targetAmount) * 100}
                                label={`$${goal.currentAmount} / $${goal.targetAmount}`}
                                className="mb-2"
                                variant={goal.currentAmount >= goal.targetAmount? "success": "primary"}
                            />

                            <p className='text-white'>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                        </div>
                    ))
                )}

            </Card.Body>
        </Card>
    );
}