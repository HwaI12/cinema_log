import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100vw;
  padding: 1rem 2rem;
  background-color: #fff; /* 背景色を白に変更 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333; /* テキストの色を黒に変更 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  padding-right: 3rem;
`;

const Logo = styled.div`
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  font-weight: 400;
  font-size: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
  color: #333; /* ロゴの色を黒に変更 */
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #eede77; /* ボタンの色を黄色に変更 */
  color: #333; /* ボタンの文字色を黒に変更 */
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  font-weight: 300;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #e0d569; /* ホバー時のボタンの色 */
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
      {user && <Button onClick={handleLogout}>ログアウト</Button>}
    </HeaderContainer>
  );
};

export default Header;
