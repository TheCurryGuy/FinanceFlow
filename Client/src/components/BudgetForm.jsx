import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../features/budget/budgetSlice';
import { Form, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components

export default function BudgetForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const budgetStatus = useSelector(state => state.budget.status);
  const budgetError = useSelector(state => state.budget.error);

  const onSubmit = (data) => {
    const budgetData = {
      ...data,
      limit: parseFloat(data.limit)
    };
    dispatch(createBudget(budgetData));
    reset();
  };

  return (
    <div className="bg-dark text-white p-4 rounded shadow border border-white">
      <h2 className="mb-4">Add Budget</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            {...register('category', { required: 'Category is required' })}
            type="text"
            placeholder="Enter Category"
            isInvalid={!!errors.category}
            className="bg-dark text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errors.category?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Limit</Form.Label>
          <Form.Control
            {...register('limit', { required: 'Limit is required' })}
            type="number"
            step="0.01"
            placeholder="Enter Limit"
            isInvalid={!!errors.limit}
            className="bg-dark text-white"
          />
          <Form.Control.Feedback type="invalid">
            {errors.limit?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Period</Form.Label>
          <Form.Select
            {...register('period', { required: 'Period is required' })}
            isInvalid={!!errors.period}
            className="bg-dark text-white" // Corrected className
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.period?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {budgetStatus === 'failed' && (
          <Alert variant="danger">
            {budgetError?.error || 'Failed to add Budget'}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="w-100" disabled={budgetStatus === 'loading'}>
          {budgetStatus === 'loading' ? 'Adding...' : 'Add Budget'}
        </Button>
      </Form>
    </div>
  );
}