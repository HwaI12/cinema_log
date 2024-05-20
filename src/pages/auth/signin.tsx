"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: 1px solid #d9dae2; /* フォームの枠線の色 */
  border-radius: 10px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  width: 100%;
  margin-bottom: 0.3rem;
  color: #333;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d9dae2; /* 入力フィールドの枠線の色 */
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #eede77; /* ボタンの色 */
  color: #333; /* ボタンの文字色 */
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e0d569; /* ホバー時のボタンの色 */
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  color: #333; /* リンクテキストの色 */
  font-size: 0.875rem;
  text-align: right; /* テキストを右揃えに変更 */
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      alert('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    } else if (data?.user?.email_confirmed_at === null) {
      alert('メールアドレスを確認してください。');
    } else {
      router.push('/');
    }
  };

  return (
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
  );
};

export default SignIn;
