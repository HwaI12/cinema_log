"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      alert('Invalid login credentials. Please check your email and password and try again.');
    } else if (data?.user?.email_confirmed_at === null) {
      alert('Please confirm your email address before signing in.');
    } else {
      router.push('/');
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/signin',
      },
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the confirmation link.');
    }
  };

  return (
    <div>
      <h1>Sign In / Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </div>
  );
}
