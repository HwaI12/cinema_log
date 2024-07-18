"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import Header from '../../components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  font-family: 'Zen Maru Gothic', serif;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #d9dae2; /* フォームの枠線の色 */
  box-sizing: border-box;
  font-family: 'Zen Maru Gothic', serif;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
`;

const Label = styled.label`
  display: block;
  text-align: left;
  width: 100%;
  margin-bottom: 0.3rem;
  color: #333;
  font-size: 1rem;
  font-family: 'Zen Maru Gothic', serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d9dae2;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: 'Zen Maru Gothic', serif;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #2e4d61;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #eede77;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Zen Maru Gothic', serif;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  &:hover {
    background-color: #e0d569;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  color: #333; 
  font-size: 0.875rem;
  text-align: right;
  font-family: 'Zen Maru Gothic', serif;
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ログイン処理
  const handleSignIn = async () => {
    setLoading(true);
    // ユーザーのメールアドレスとパスワードを送信
    // supabase.auth.signInWithPasswordメソッドを使用してサインインを試みる
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      alert('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    } else if (data?.user?.email_confirmed_at === null) {
      alert('メールアドレスを確認してください。');
    } else {
      // ユーザーをホームページにリダイレクト
      router.push('/');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Title>ログイン</Title>
          <Label>メールアドレス</Label>
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>パスワード</Label>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? 'ロード中...' : 'ログイン'}
          </Button>
          <LinkText>
            <Link href="/auth/signup">会員登録はこちら</Link>
          </LinkText>
        </Form>
      </Container>
    </>
  );
};

export default SignIn;
