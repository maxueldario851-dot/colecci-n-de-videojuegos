import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../core/services/game';
import { Videogame } from '../../../models/videogame.model';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-form.html',
  styleUrls: ['./game-form.scss']
})
export class GameFormComponent implements OnInit {
  gameForm: FormGroup;
  isEditMode = false;
  gameId: string | null = null;

  plataformas = ['PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch', 'PC', 'Otro'];
  generos = ['Acción', 'Aventura', 'RPG', 'FPS', 'Deportes', 'Carreras', 'Estrategia', 'Puzzle', 'Simulación', 'Horror'];
  estados: ('Completado' | 'Jugando' | 'Pendiente')[] = ['Completado', 'Jugando', 'Pendiente'];

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.gameForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      plataforma: ['', Validators.required],
      genero: ['', Validators.required],
      anioLanzamiento: ['', [Validators.required, Validators.min(1970), Validators.max(new Date().getFullYear() + 2)]],
      estado: ['Pendiente', Validators.required],
      calificacion: ['', [Validators.min(0), Validators.max(10)]],
      fechaAdquisicion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.isEditMode = true;
      this.loadGame();
    }
  }

  loadGame(): void {
    if (this.gameId) {
      const game = this.gameService.getGameById(this.gameId);
      if (game) {
        const fecha = new Date(game.fechaAdquisicion);
        const fechaFormato = fecha.toISOString().split('T')[0];
        
        this.gameForm.patchValue({
          titulo: game.titulo,
          plataforma: game.plataforma,
          genero: game.genero,
          anioLanzamiento: game.anioLanzamiento,
          estado: game.estado,
          calificacion: game.calificacion || '',
          fechaAdquisicion: fechaFormato
        });
      }
    }
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const formValue = this.gameForm.value;
      const gameData: Videogame = {
        titulo: formValue.titulo,
        plataforma: formValue.plataforma,
        genero: formValue.genero,
        anioLanzamiento: parseInt(formValue.anioLanzamiento),
        estado: formValue.estado,
        calificacion: formValue.calificacion ? parseInt(formValue.calificacion) : undefined,
        fechaAdquisicion: new Date(formValue.fechaAdquisicion),
        userId: 'user1',
        createdAt: new Date()
      };

      if (this.isEditMode && this.gameId) {
        this.gameService.updateGame(this.gameId, gameData);
      } else {
        this.gameService.addGame(gameData);
      }

      this.router.navigate(['/games']);
    } else {
      this.markFormGroupTouched(this.gameForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/games']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.gameForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('max')) {
      return `El valor máximo es ${control.errors?.['max'].max}`;
    }
    return '';
  }
}