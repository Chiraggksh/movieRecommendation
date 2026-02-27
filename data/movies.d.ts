export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  description: string;
  posterUrl: string;
}

export const movies: Movie[];
