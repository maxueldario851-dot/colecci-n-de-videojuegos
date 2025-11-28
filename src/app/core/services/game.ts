import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Videogame } from '../../models/videogame.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesSubject = new BehaviorSubject<Videogame[]>([
    {
      id: '1',
      titulo: 'The Legend of Zelda: Breath of the Wild',
      plataforma: 'Nintendo Switch',
      genero: 'Aventura',
      anioLanzamiento: 2017,
      estado: 'Completado',
      calificacion: 10,
      fechaAdquisicion: new Date('2020-05-15'),
      userId: 'user1',
      createdAt: new Date('2020-05-15')
    },
    {
      id: '2',
      titulo: 'God of War',
      plataforma: 'PlayStation 5',
      genero: 'Acción',
      anioLanzamiento: 2018,
      estado: 'Jugando',
      calificacion: 9,
      fechaAdquisicion: new Date('2021-03-20'),
      userId: 'user1',
      createdAt: new Date('2021-03-20')
    },
    {
      id: '3',
      titulo: 'Halo Infinite',
      plataforma: 'Xbox Series X',
      genero: 'FPS',
      anioLanzamiento: 2021,
      estado: 'Pendiente',
      fechaAdquisicion: new Date('2023-01-10'),
      userId: 'user1',
      createdAt: new Date('2023-01-10')
    }
  ]);

  games$ = this.gamesSubject.asObservable();

  getGames(): Observable<Videogame[]> {
    return this.games$;
  }

  addGame(game: Videogame): void {
    const newGame = {
      ...game,
      id: Date.now().toString(),
      userId: 'user1',
      createdAt: new Date()
    };
    const currentGames = this.gamesSubject.value;
    this.gamesSubject.next([...currentGames, newGame]);
  }

  updateGame(id: string, game: Partial<Videogame>): void {
    const currentGames = this.gamesSubject.value;
    const index = currentGames.findIndex(g => g.id === id);
    if (index !== -1) {
      currentGames[index] = { ...currentGames[index], ...game };
      this.gamesSubject.next([...currentGames]);
    }
  }

  deleteGame(id: string): void {
    const currentGames = this.gamesSubject.value.filter(g => g.id !== id);
    this.gamesSubject.next(currentGames);
  }

  getGameById(id: string): Videogame | undefined {
    return this.gamesSubject.value.find(g => g.id === id);
  }
}