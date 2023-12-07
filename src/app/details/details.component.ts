import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovies } from '../services/movie/movie.model';
import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  movie: IMovies | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movie = this.movieService.getMovieById(Number(movieId)) || ({} as IMovies);
  }

}
