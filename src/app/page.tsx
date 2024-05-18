// src/app/page.tsx
"use client"; // これを追加して、クライアントコンポーネントとしてマークします

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // next/router の代わりに next/navigation を使用
import { supabase } from '../lib/supabaseClient';

const HomePage = () => {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      setUser(data?.session?.user ?? null);
      if (!data?.session) {
        router.push('/auth/signin');
      }
    };
    fetchUser();
  }, [router]);

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save a review.');
      return;
    }
    
    const { error } = await supabase
      .from('movies')
      .insert([{ title, rating, review, date: new Date().toISOString(), user_id: user.id }]);
    if (error) {
      alert(error.message);
    } else {
      setTitle('');
      setRating(0);
      setReview('');
      alert('Movie review saved successfully!');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Record a Movie Review</h1>
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
};

export default HomePage;
