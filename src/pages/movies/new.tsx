import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
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

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  span {
    cursor: pointer;
    font-size: 2rem;
    color: gold;
  }
`;

const NewMovie = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    const user = session?.user;
    if (!user) {
      router.push('/auth/signin');
      setLoading(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from('movies')
      .insert([{ title, rating, review, date: new Date().toISOString(), user_id: user.id }]);
    setLoading(false);

    if (insertError) {
      alert(insertError.message);
    } else {
      router.push('/movies');
    }
  };

  return (
    <Container>
      <Form>
        <Title>Record a New Movie</Title>
        <Input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StarRating>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{ color: star <= rating ? 'gold' : 'grey' }}
            >
              ★
            </span>
          ))}
        </StarRating>
        <TextArea
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Loading...' : 'Save'}
        </Button>
      </Form>
    </Container>
  );
};

export default NewMovie;
