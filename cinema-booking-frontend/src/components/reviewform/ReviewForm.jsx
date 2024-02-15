import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, revText, rating, labelText, defaultValue }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlRating">
        <Form.Label>Rating:</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="5"
          step="0.5"
          value={rating.current} 
          onChange={(e) => (rating.current = parseFloat(e.target.value))}
        />
      </Form.Group>
      <Button variant="outline-info" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default ReviewForm;
