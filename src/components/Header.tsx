import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100vw;
  padding: 1rem 2rem;
  background-color: #ff6f61;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: #ff6f61;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #ffe0dc;
  }
`;

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      setUser(data?.session?.user ?? null);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      setUser(null);
      router.push('/auth/signin');
    }
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => router.push('/')}>CinemaLog</Logo>
      {user && <Button onClick={handleLogout}>Logout</Button>}
    </HeaderContainer>
  );
};

export default Header;
