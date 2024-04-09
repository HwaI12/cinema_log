interface Movie {
    id: number;
    title: string;
    watchedDate: Date;
    review?: string;
}

const movies: Movie[] = [
    { id: 1, title: '映画1', watchedDate: new Date(), review: '面白かった' },
    { id: 2, title: '映画2', watchedDate: new Date(), review: '感動した' },
];

export function getMovies(): Movie[] {
    return movies;
}

export function addMovie(movie: Movie): void {
    movies.push(movie);
}

export function updateMovie(id: number, updatedMovie: Movie): void {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
        movies[index] = { ...movies[index], ...updatedMovie };
    }
}

export function deleteMovie(id: number): void {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
        movies.splice(index, 1);
    }
}