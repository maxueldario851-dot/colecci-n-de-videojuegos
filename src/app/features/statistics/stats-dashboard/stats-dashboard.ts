import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../core/services/game';
import { Videogame } from '../../../models/videogame.model';

interface EstadisticasEstado {
  estado: string;
  cantidad: number;
  porcentaje: number;
}

interface PlataformaStats {
  nombre: string;
  cantidad: number;
}

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-dashboard.html',
  styleUrls: ['./stats-dashboard.scss']
})
export class StatsDashboardComponent implements OnInit {
  totalJuegos = 0;
  promedioCalificacion = 0;
  estadisticasEstado: EstadisticasEstado[] = [];
  plataformasStats: PlataformaStats[] = [];
  ultimosJuegos: Videogame[] = [];
  generosStats: { nombre: string; cantidad: number }[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.games$.subscribe(games => {
      this.calcularEstadisticas(games);
    });
  }

  calcularEstadisticas(games: Videogame[]): void {
    this.totalJuegos = games.length;
    
    // Promedio de calificaciones
    const juegosConCalificacion = games.filter(g => g.calificacion);
    if (juegosConCalificacion.length > 0) {
      const suma = juegosConCalificacion.reduce((acc, g) => acc + (g.calificacion || 0), 0);
      this.promedioCalificacion = Math.round((suma / juegosConCalificacion.length) * 10) / 10;
    }

    // Estadísticas por estado
    const estadoCount: { [key: string]: number } = {};
    games.forEach(game => {
      estadoCount[game.estado] = (estadoCount[game.estado] || 0) + 1;
    });

    this.estadisticasEstado = Object.keys(estadoCount).map(estado => ({
      estado,
      cantidad: estadoCount[estado],
      porcentaje: Math.round((estadoCount[estado] / this.totalJuegos) * 100)
    }));

    // Plataformas más usadas
    const plataformaCount: { [key: string]: number } = {};
    games.forEach(game => {
      plataformaCount[game.plataforma] = (plataformaCount[game.plataforma] || 0) + 1;
    });

    this.plataformasStats = Object.keys(plataformaCount)
      .map(nombre => ({
        nombre,
        cantidad: plataformaCount[nombre]
      }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    // Géneros más jugados
    const generoCount: { [key: string]: number } = {};
    games.forEach(game => {
      generoCount[game.genero] = (generoCount[game.genero] || 0) + 1;
    });

    this.generosStats = Object.keys(generoCount)
      .map(nombre => ({
        nombre,
        cantidad: generoCount[nombre]
      }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    // Últimos 5 juegos agregados
    this.ultimosJuegos = [...games]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Completado': return 'estado-completado';
      case 'Jugando': return 'estado-jugando';
      case 'Pendiente': return 'estado-pendiente';
      default: return '';
    }
  }

  getBarWidth(cantidad: number): number {
    if (this.totalJuegos === 0) return 0;
    return (cantidad / this.totalJuegos) * 100;
  }

  getMaxPlataforma(): number {
    return Math.max(...this.plataformasStats.map(p => p.cantidad), 1);
  }
  getCompletados(): number {
    const stat = this.estadisticasEstado.find(e => e.estado === 'Completado');
    return stat ? stat.cantidad : 0;
  }

  getJugando(): number {
    const stat = this.estadisticasEstado.find(e => e.estado === 'Jugando');
    return stat ? stat.cantidad : 0;
  }

  getBarWidthPlataforma(cantidad: number): number {
    return (cantidad / this.getMaxPlataforma()) * 100;
  }
}
