// pages/movies/index.tsx
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Movies() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('movies')
      .insert([{ title, rating, review, date: new Date().toISOString() }]);
    if (error) {
      alert(error.message);
    } else {
      setTitle('');
      setRating(0);
      setReview('');
    }
  };

  return (
    <div>
      <h1>Record a Movie</h1>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'grey' }}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
