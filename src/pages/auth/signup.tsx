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
  border: 1px solid #d9dae2;
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
  font-family: 'Zen Maru Gothic', serif;
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

const SignUp = () => {
  // メールアドレスとパスワードの状態を管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 処理中かどうかの状態を管理
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    // ユーザーのメールアドレスとパスワードを送信
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // メール確認後のリダイレクト先を指定
        emailRedirectTo: window.location.origin + '/auth/signin',
      },
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert('確認リンクをメールで確認してください。');
      // ユーザーをサインインページ(/auth/signin)にリダイレクト
      router.push('/auth/signin');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Title>会員登録</Title>
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
          <Button onClick={handleSignUp} disabled={loading}>
            {loading ? 'ロード中...' : '会員登録'}
          </Button>
          <LinkText>
            <Link href="/auth/signin">ログインはこちら</Link>
          </LinkText>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
