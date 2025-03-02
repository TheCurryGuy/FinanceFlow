import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal } from '../features/goal/goalSlice';
import { Form, Button, Alert } from 'react-bootstrap';

export default function GoalForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const goalStatus = useSelector(state => state.goal.status);
    const goalError = useSelector(state => state.goal.error);
    const [localLoading, setLocalLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Reset form ONLY after successful submission AND when formSubmitted is true
    useEffect(() => {
        if (goalStatus === 'succeeded' && formSubmitted) {
            reset();
            setLocalLoading(false);
            setFormSubmitted(false); // Reset formSubmitted
        }
    }, [goalStatus, reset, formSubmitted]);


    const onSubmit = (data) => {
        setLocalLoading(true);
        setFormSubmitted(true);
        const goalData = {
            ...data,
            targetAmount: parseFloat(data.targetAmount),
            deadline: new Date(data.deadline).toISOString() // Convert to ISO string
        };
        dispatch(createGoal(goalData)).catch(() => {
            setLocalLoading(false);
             setFormSubmitted(false);
        });
    };

    return (
        <div className="bg-dark text-white p-4 border border-white rounded shadow">
            <h2 className="mb-4">Add Goal</h2>
             {goalStatus === 'failed' && <p className='text-danger'>Error: {goalError ? goalError.error : 'Failed to add Goal'}</p>}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        placeholder="Enter Title"
                        isInvalid={!!errors.title}
                        className="bg-dark text-white"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Target Amount</Form.Label>
                    <Form.Control
                        {...register('targetAmount', { required: 'Target amount is required', valueAsNumber:true })}
                        type="number"
                        step="0.01"
                        placeholder="Enter Target Amount"
                        isInvalid={!!errors.targetAmount}
                        className="bg-dark text-white"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.targetAmount?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                        {...register('deadline', { required: 'Deadline is required' })}
                        type="date"
                        placeholder="Select Deadline"
                        isInvalid={!!errors.deadline}
                        className="bg-dark text-white"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.deadline?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={localLoading}>
                    {localLoading ? 'Adding...' : 'Add Goal'}
                </Button>
            </Form>
        </div>
    );
}