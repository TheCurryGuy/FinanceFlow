import React from 'react';
import { Card } from 'react-bootstrap'; // Import Card

export default function SharedExpenses() {
  return (
    <Card bg="dark" text="white" className='border border-white'>
      <Card.Body>
        <Card.Title as="h2">Shared Expenses</Card.Title>
        <Card.Text>
          Shared expenses feature coming soon!
        </Card.Text>
      </Card.Body>
    </Card>
  );
}