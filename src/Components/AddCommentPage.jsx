
 import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AddCommentPage = () => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://bookify-new.onrender.com/api/v1/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      setComment('');
      setLoading(false);
      alert('Comment added successfully!');
    } catch (error) {
      setError('Failed to add comment');
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Add Comment</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Adding Comment...' : 'Add Comment'}
        </Button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </Container>
  );
};

export default AddCommentPage;