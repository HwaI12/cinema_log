import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../../components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  background-color: #fff;
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  transition: background-color 0.3s ease-in-out; /* 背景色のトランジション */
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
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  transition: box-shadow 0.3s ease-in-out; /* ボックスシャドウのトランジション */

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* ホバー時のボックスシャドウ */
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
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d9dae2; /* 入力フィールドの枠線の色 */
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  transition: border-color 0.3s ease-in-out; /* ボーダーカラーのトランジション */

  &:focus {
    border-color: #0070f3; /* フォーカス時のボーダーカラー */
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2); /* フォーカス時のボックスシャドウ */
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d9dae2; /* 入力フィールドの枠線の色 */
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  transition: border-color 0.3s ease-in-out; /* ボーダーカラーのトランジション */

  &:focus {
    border-color: #0070f3; /* フォーカス時のボーダーカラー */
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2); /* フォーカス時のボックスシャドウ */
  }
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
  font-family: 'Zen Maru Gothic', serif; /* フォントを適用 */
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out; /* バックグラウンドカラーとトランスフォームのトランジション */

  &:hover {
    background-color: #e0d569; /* ホバー時のボタンの色 */
    transform: translateY(-2px); /* ホバー時のトランスフォーム */
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const BackButton = styled(Button)`
  background-color: #ccc; /* 戻るボタンの色 */
  color: #333;

  &:hover {
    background-color: #aaa;
    transform: translateY(-2px); /* ホバー時のトランスフォーム */
  }
`;

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => setRating(star)}
        style={{ cursor: 'pointer', fontSize: '2rem', color: star <= rating ? 'gold' : 'grey', transition: 'color 0.2s ease-in-out' }} /* 色のトランジション */
      >
        ★
      </span>
    ))}
  </div>
);

const NewMovie = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    const user = session?.user;
    if (!user) {
      router.push('/auth/signin');
      setLoading(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from('movies')
      .insert([{ title, rating, review, date: new Date().toISOString(), user_id: user.id }]);
    setLoading(false);

    if (insertError) {
      alert(insertError.message);
    } else {
      router.push('/movies');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Title>映画を記録する</Title>
          <Label>映画のタイトル</Label>
          <Input
            type="text"
            placeholder="映画のタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label>評価</Label>
          <StarRating rating={rating} setRating={setRating} />
          <Label>レビュー</Label>
          <TextArea
            placeholder="レビューを書く"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'ロード中...' : '保存'}
          </Button>
          <BackButton onClick={() => router.back()}>
            戻る
          </BackButton>
        </Form>
      </Container>
    </>
  );
};

export default NewMovie;
