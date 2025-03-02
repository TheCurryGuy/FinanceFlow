import React, { useEffect } from 'react'; // Removed useState
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense } from '../features/expense/expenseSlice';
import { fetchGoals } from '../features/goal/goalSlice';
import { fetchBudgets } from '../features/budget/budgetSlice';
import { Form, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components

export default function ExpenseForm() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm(); // Added formState
    const dispatch = useDispatch();
    const isRecurring = watch('isRecurring');
    const goals = useSelector(state => state.goal.goals);
    const budgets = useSelector(state => state.budget.budgets);
    const expenseStatus = useSelector(state => state.expense.status);
    const expenseError = useSelector(state => state.expense.error);

    useEffect(() => {
        dispatch(fetchGoals());
        dispatch(fetchBudgets());
    }, [dispatch]);

    const onSubmit = async (data) => {
        const expenseData = {
            ...data,
            amount: parseFloat(data.amount),
            isRecurring: data.isRecurring === 'true',
            recurrence: data.isRecurring === 'true'
                ? { frequency: data.frequency, endDate: data.endDate }
                : null,
            goal: data.goal === "" ? null : data.goal,  // Correct handling of empty string
            budget: data.budget === "" ? null : data.budget, // Correct handling of empty string
        };
        try {
            await dispatch(createExpense(expenseData));
            reset();
        } catch (error) {
            // Error is handled by Redux, but you can still log it for debugging
            console.error("Error dispatching createExpense:", error);
        }
    };

    return (
        <div className="bg-dark text-white p-4 border border-white rounded shadow mb-4">
            <h2 className="mb-4">Add Expense</h2>
             {expenseStatus === 'failed' && expenseError && (
                <Alert variant="danger">
                    {expenseError.error || 'Failed to create expense'}
                </Alert>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        {...register('amount', { required: 'Amount is required' })}
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        isInvalid={!!errors.amount}
                        className="bg-dark text-white"
                    />
                     <Form.Control.Feedback type="invalid">
                        {errors.amount?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Enter description"
                        isInvalid={!!errors.description}
                        className="bg-dark text-white"
                    />
                     <Form.Control.Feedback type="invalid">
                        {errors.description?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                 <Form.Group className="mb-3">
                    <Form.Label>Link to Goal</Form.Label>
                    <Form.Select
                        {...register('goal')}
                        className="bg-dark text-white"
                    >
                        <option value="">Select a Goal (Optional)</option>
                        {goals.map((goal) => (
                            <option key={goal._id} value={goal._id}>
                                {goal.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Link to Budget</Form.Label>
                    <Form.Select
                        {...register('budget')}
                        className="bg-dark text-white"
                    >
                        <option value="">Select a Budget (Optional)</option>
                        {budgets.map((budget) => (
                            <option key={budget._id} value={budget._id}>
                                {budget.category} - {budget.period} (${budget.limit - budget.spent} remaining)
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Recurring?</Form.Label>
                    <Form.Select {...register('isRecurring')} className="bg-dark text-white">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Form.Select>
                </Form.Group>

                {isRecurring === 'true' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Frequency</Form.Label>
                            <Form.Select {...register('frequency')}  className="bg-dark text-white">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                {...register('endDate')}
                                type="date"
                                placeholder="Select end date"
                                className="bg-dark text-white"
                            />
                        </Form.Group>
                    </>
                )}

                <Button variant="primary" type="submit" className="w-100" disabled={expenseStatus === 'loading'}>
                    {expenseStatus === 'loading' ? 'Adding...' : 'Add Expense'}
                </Button>
            </Form>
        </div>
    );
}