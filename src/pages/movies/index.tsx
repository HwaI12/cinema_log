import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Header from '../../components/Header';

const Container = styled.div`
  padding: 2rem;
  margin-top: 5rem; /* Headerの高さに応じて調整してください */
`;

const MovieList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0; /* 不要な余白を削除 */
`;

const MovieItem = styled.li`
  background: white;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0;
`;

const Rating = styled.div`
  color: gold;
`;

const Review = styled.p`
  margin: 0.5rem 0 0 0;
`;

const DateText = styled.p`
  font-size: 0.8rem;
  color: grey;
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #eede77;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0d569;
  }
`;

interface Movie {
  id: number;
  title: string;
  rating: number;
  review: string;
  date: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      const user = session?.user;
      if (user) {
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .eq('user_id', user.id);
        if (error) {
          console.error(error);
        } else {
          setMovies(data || []);
        }
      } else {
        router.push('/auth/signin');
      }
    };

    fetchMovies();
  }, [router]);

  return (
    <>
      <Header />
      <Container>
        <h1>My Movie Reviews</h1>
        <MovieList>
          {movies.map((movie) => (
            <MovieItem key={movie.id}>
              <Title>{movie.title}</Title>
              <Rating>{'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}</Rating>
              <Review>{movie.review}</Review>
              <DateText>{new Date(movie.date).toLocaleDateString()}</DateText>
            </MovieItem>
          ))}
        </MovieList>
        <AddButtonContainer>
          <Link href="/movies/new" passHref>
            <AddButton>
              <PlusCircleIcon className="w-10 h-10 text-white" />
            </AddButton>
          </Link>
        </AddButtonContainer>
      </Container>
    </>
  );
};

export default Movies;
