// movie.service.ts
import { Injectable } from '@angular/core';
import { IMovies } from './movie.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
   public moviesInfos: IMovies[] = [
    { id: 1, title: 'Tenet', releaseDate: '2020-09-03', description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.", duration: '2:30:00', gen: 'Action, Sci-Fi', img: '../../assets/Tenet.png', rating: 7.8, trailer: 'https://www.youtube.com/watch?v=LdOM0x0XDMo' },
    { id: 2, title: 'Spider-Man: Into the Spider-Verse', releaseDate: '2018-12-14', description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider￾powered individuals from other dimensions to stop a threat for all realities.", duration: '1:57:00', gen: 'Action, Animation, Adventure', img: '../../assets/SpiderMan.png', rating: 8.4, trailer: 'https://www.youtube.com/watch?v=tg52up16eq0' },
    { id: 3, title: 'Knives Out', releaseDate: '2019-11-27', description: "A detective investigates the death of a patriarch of an eccentric, combative family.", duration: '2:10:00', gen: 'Comedy, Crime, Drama', img: '../../assets/KnivesOut.png', rating: 7.9, trailer: 'https://www.youtube.com/watch?v=qGqiHJTsRkQ' },
    { id: 4, title: 'Guardians of the Galaxy', releaseDate: '2014-08-01', description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.", duration: '2:01:00', gen: 'Action, Adventure, Comedy', img: '../../assets/GuardiansofTheGalaxy.png', rating: 8.0, trailer: 'https://www.youtube.com/watch?v=d96cjJhvlMA' },
    { id: 5, title: 'Avengers: Age of Ultron', releaseDate: '2015-05-01', description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.", duration: '2:21:00', gen: 'Action, Adventure, Sci-Fi', img: '../../assets/Avengers.png', rating: 7.3, trailer: 'https://www.youtube.com/watch?v=tmeOjFno6Do' }
  ];

  public Watchlist: IMovies[] = [];
  public storage: string = 'watchlist';

  getMovies(): IMovies[] {
    return this.moviesInfos;
  }

  getWatchlist(): IMovies[] {
    return this.Watchlist;
  }

  addToWatchlist(movie: IMovies): void {
    if (!this.isWatchlist(movie)) {
      this.Watchlist.push(movie);
      localStorage.setItem(this.storage, JSON.stringify(this.Watchlist));
    }
  }

  removeFromWatchlist(movie: IMovies): void {
    this.Watchlist = this.Watchlist.filter(m => m !== movie);
    localStorage.setItem(this.storage, JSON.stringify(this.Watchlist));
  }

  isWatchlist(movie: IMovies): boolean {
    return this.Watchlist.some(m => m === movie);
  }
  
  getMovieById(id: number): IMovies | undefined {
    return this.moviesInfos.find(movie => movie.id === id);
  }

  sortMovies(sortBy: keyof IMovies, sortOrder: 'asc' | 'desc'): IMovies[] {
    return this.moviesInfos.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      const aValue = a[sortBy] as string | number | Date;
      const bValue = b[sortBy] as string | number | Date;

      if (aValue > bValue) {
        return order;
      } else if (aValue < bValue) {
        return -order;
      } else {
        return 0;
      }
    });
  }

}

