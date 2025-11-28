export interface Videogame {
  id?: string;
  titulo: string;
  plataforma: string;
  genero: string;
  anioLanzamiento: number;
  estado: 'Completado' | 'Jugando' | 'Pendiente';
  calificacion?: number;
  fechaAdquisicion: Date;
  userId: string;
  createdAt: Date;
}