import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../../core/services/game';
import { Videogame } from '../../../models/videogame.model';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent implements OnInit {
  games: Videogame[] = [];
  filteredGames: Videogame[] = [];
  searchTerm: string = '';
  filterEstado: string = 'Todos';
  sortBy: string = 'titulo';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.games$.subscribe(games => {
      this.games = games;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = [...this.games];

    if (this.searchTerm) {
      result = result.filter(game =>
        game.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        game.plataforma.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        game.genero.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterEstado !== 'Todos') {
      result = result.filter(game => game.estado === this.filterEstado);
    }

    result.sort((a, b) => {
      if (this.sortBy === 'titulo') {
        return a.titulo.localeCompare(b.titulo);
      } else if (this.sortBy === 'calificacion') {
        return (b.calificacion || 0) - (a.calificacion || 0);
      } else if (this.sortBy === 'anio') {
        return b.anioLanzamiento - a.anioLanzamiento;
      }
      return 0;
    });

    this.filteredGames = result;
  }

  deleteGame(id: string): void {
    if (confirm('¿Estás seguro de eliminar este juego?')) {
      this.gameService.deleteGame(id);
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Completado': return 'estado-completado';
      case 'Jugando': return 'estado-jugando';
      case 'Pendiente': return 'estado-pendiente';
      default: return '';
    }
  }
}