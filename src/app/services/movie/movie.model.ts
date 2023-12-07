export interface IMovies {
    id?: number;
    title: string;
    description: string;
    duration: string;
    rating: number;
    gen: string;
    releaseDate: string;
    trailer: string;
    img: string;
    isInWatchlist?: boolean;
}