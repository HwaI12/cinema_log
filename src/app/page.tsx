"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import { Session } from '@supabase/supabase-js';

const HomePage = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/movies');
    }
  }, [session, router]);

  return (
    <div className="container">
      <Header />
      <div className="content">
        <h1>Welcome to CinemaLog</h1>
        <p>Please sign in to continue</p>
        <button onClick={() => router.push('/auth/signin')}>Sign In</button>
      </div>
    </div>
  );
};

export default HomePage;
