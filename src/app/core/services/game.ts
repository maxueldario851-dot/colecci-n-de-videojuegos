import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Videogame } from '../../models/videogame.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  get games$(): Observable<Videogame[]> {
    if (!this.auth.currentUser) {
      return of([]);
    }
    const userId = this.auth.currentUser.uid;
    const gamesCollection = collection(this.firestore, 'videogames');
    const q = query(gamesCollection, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Videogame[]>;
  }

  async addGame(game: Videogame): Promise<void> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) throw new Error('Usuario no autenticado');
    
    const gamesCollection = collection(this.firestore, 'videogames');
    const gameData = {
      ...game,
      userId,
      createdAt: new Date()
    };
    await addDoc(gamesCollection, gameData);
  }

  async updateGame(id: string, game: Partial<Videogame>): Promise<void> {
    const gameDoc = doc(this.firestore, 'videogames', id);
    await updateDoc(gameDoc, { ...game });
  }

  async deleteGame(id: string): Promise<void> {
    const gameDoc = doc(this.firestore, 'videogames', id);
    await deleteDoc(gameDoc);
  }

  getGameById(id: string): Videogame | undefined {
    return undefined;
  }
}