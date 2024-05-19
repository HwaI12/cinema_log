import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

const Header = () => {
  const { session } = useSessionContext();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header>
      <h1>CinemaLog</h1>
      {session && (
        <button onClick={signOut}>Sign Out</button>
      )}
    </header>
  );
};

export default Header;
