import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px); /* Adjust height to accommodate header */
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  height: 150px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #0070f3;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Star = styled.span<{ active: boolean }>`
  cursor: pointer;
  font-size: 2rem;
  color: ${props => (props.active ? 'gold' : 'grey')};

  &:hover {
    color: gold;
  }
`;

export default function Movies() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('movies')
      .insert([{ title, rating, review, date: new Date().toISOString() }]);
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setTitle('');
      setRating(0);
      setReview('');
      alert('Movie review saved successfully!');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Record a Movie</Title>
        <Input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Stars>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              active={star <= rating}
              onClick={() => setRating(star)}
            >
              ★
            </Star>
          ))}
        </Stars>
        <TextArea
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Loading...' : 'Save'}
        </Button>
      </Container>
    </>
  );
}
