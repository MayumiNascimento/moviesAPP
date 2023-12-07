import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../services/movie/movie.service'

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {

  public watchlist = this.services.Watchlist;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private services: MovieService ) {}


}
