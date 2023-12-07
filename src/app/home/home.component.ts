import { Component, Injectable, OnInit } from '@angular/core';
import { WatchlistComponent } from '../watchlist/watchlist.component';
import { MatDialog } from '@angular/material/dialog';
import { IMovies } from '../services/movie/movie.model';
import { MovieService } from '../services/movie/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: IMovies[] = [];
  watchList: IMovies[] = [];
  sortBy: string = 'title_asc';

  constructor(private dialog: MatDialog, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.watchList = this.movieService.getWatchlist();
    this.sortMovies();
  }

  addToWatchlist(movie: IMovies): void {
    this.movieService.addToWatchlist(movie);
  }

  removeFromWatchlist(movie: IMovies): void {
    this.movieService.removeFromWatchlist(movie);
  }

  isWatchlist(movie: IMovies): boolean {
    return this.movieService.isWatchlist(movie);
  }

  toggleWatchlist(movie: IMovies): void {

    movie.isInWatchlist = !movie.isInWatchlist;

    if (this.isWatchlist(movie)) {
        this.removeFromWatchlist(movie);
    } else {
        this.addToWatchlist(movie);
    }
  }

  openWatchlistModal(): void {
    this.dialog.open(WatchlistComponent, {
      width: '400px',
      data: { watchlist: this.movieService.getWatchlist() }
    });
  }

  sortMovies(): void {
    const [sortBy, sortOrder] = this.sortBy.split('_');
    this.movies = this.movieService.sortMovies(sortBy as keyof IMovies, sortOrder as 'asc' | 'desc');
  }

  navigateToDetail(movieId: string): void {
    this.router.navigate(['/detail', movieId]);
  }

  watchlistIconEmpty = `
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
    <g fill-opacity="0" fill="#dc1a1a" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path transform="scale(10.66667,10.66667)" d="M20,2v20l-8,-3l-8,3v-20z" id="strokeMainSVG" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"></path><g transform="scale(10.66667,10.66667)" fill-opacity="0" fill="#ce2626" stroke="none" stroke-width="1" stroke-linejoin="miter"><path d="M4,2v20l8,-3l8,3v-20h-14z"></path></g></g>
  </svg>`;

  watchlistIconFilled = `
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
    <g fill-opacity="0" fill="#dc1a1a" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path transform="scale(10.66667,10.66667)" d="M20,2v20l-8,-3l-8,3v-20z" id="strokeMainSVG" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"></path><g transform="scale(10.66667,10.66667)" stroke="none" stroke-width="1" stroke-linejoin="miter"><path d="M4,2v20l8,-3l8,3v-20h-14z"></path></g></g>
  </svg>`;

}