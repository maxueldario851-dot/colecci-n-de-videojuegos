import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Videogame } from '../../models/videogame.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // Obtener todos los juegos del usuario actual
  getGames(): Observable<Videogame[]> {
    const userId = this.auth.currentUser?.uid || 'anonymous';
    const gamesCollection = collection(this.firestore, 'videogames');
    const q = query(
      gamesCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Videogame[]>;
  }

  // Agregar un nuevo juego
  async addGame(game: Videogame): Promise<void> {
    const userId = this.auth.currentUser?.uid || 'anonymous';
    const gamesCollection = collection(this.firestore, 'videogames');
    const gameData = {
      ...game,
      userId,
      createdAt: new Date()
    };
    await addDoc(gamesCollection, gameData);
  }

  // Actualizar un juego existente
  async updateGame(id: string, game: Partial<Videogame>): Promise<void> {
    const gameDoc = doc(this.firestore, 'videogames', id);
    await updateDoc(gameDoc, { ...game });
  }

  // Eliminar un juego
  async deleteGame(id: string): Promise<void> {
    const gameDoc = doc(this.firestore, 'videogames', id);
    await deleteDoc(gameDoc);
  }

  // Obtener un juego por ID (versión síncrona para el formulario)
  getGameById(id: string): Videogame | undefined {
    return undefined;
  }

  // Observable de todos los juegos (para compatibilidad)
  get games$(): Observable<Videogame[]> {
    return this.getGames();
  }
}