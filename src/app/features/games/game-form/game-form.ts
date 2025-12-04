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
  isSubmitting = false;

  plataformas = [
    'PlayStation 5', 
    'PlayStation 4', 
    'Xbox Series X', 
    'Xbox One', 
    'Nintendo Switch', 
    'PC', 
    'Otro'
  ];
  
  generos = [
    'Acción', 
    'Aventura', 
    'RPG', 
    'FPS', 
    'Deportes', 
    'Carreras', 
    'Estrategia', 
    'Puzzle', 
    'Simulación', 
    'Horror',
    'Otro'
  ];
  
  estados: ('Completado' | 'Jugando' | 'Pendiente')[] = [
    'Pendiente',
    'Jugando', 
    'Completado'
  ];

  // Obtener año actual para validaciones
  currentYear = new Date().getFullYear();
  minYear = 1970;
  maxYear = this.currentYear + 2;
  currentDate = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.gameForm = this.fb.group({
      titulo: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      plataforma: ['', Validators.required],
      genero: ['', Validators.required],
      anioLanzamiento: ['', [
        Validators.required, 
        Validators.min(this.minYear), 
        Validators.max(this.maxYear),
        Validators.pattern(/^\d{4}$/) // Solo números de 4 dígitos
      ]],
      estado: ['Pendiente', Validators.required],
      calificacion: ['', [
        Validators.min(0), 
        Validators.max(10),
        Validators.pattern(/^([0-9]|10)$/) // Solo números enteros 0-10
      ]],
      fechaAdquisicion: ['', [
        Validators.required,
        this.dateValidator.bind(this)
      ]]
    });
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.isEditMode = true;
      this.loadGame();
    } else {
      // Establecer fecha de hoy por defecto
      const today = new Date().toISOString().split('T')[0];
      this.gameForm.patchValue({ fechaAdquisicion: today });
    }
  }

  // Validador personalizado para fechas
  dateValidator(control: any) {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // No permitir fechas futuras
    if (selectedDate > today) {
      return { futureDate: true };
    }
    
    return null;
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
      } else {
        // Si no encuentra el juego, redirigir
        this.router.navigate(['/games']);
      }
    }
  }

  onSubmit(): void {
    if (this.gameForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.gameForm.value;
      const gameData: Videogame = {
        titulo: formValue.titulo.trim(),
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

      // Pequeño delay para feedback visual
      setTimeout(() => {
        this.router.navigate(['/games']);
      }, 100);
    } else {
      this.markFormGroupTouched(this.gameForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
  }

  onCancel(): void {
    this.router.navigate(['/games']);
  }

  // Método mejorado para mensajes de error
  getErrorMessage(fieldName: string): string {
    const control = this.gameForm.get(fieldName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    // Mensajes personalizados por campo
    const fieldLabels: { [key: string]: string } = {
      titulo: 'El título',
      plataforma: 'La plataforma',
      genero: 'El género',
      anioLanzamiento: 'El año de lanzamiento',
      estado: 'El estado',
      calificacion: 'La calificación',
      fechaAdquisicion: 'La fecha de adquisición'
    };

    const label = fieldLabels[fieldName] || 'Este campo';

    if (errors['required']) {
      return `${label} es obligatorio`;
    }
    
    if (errors['minlength']) {
      return `${label} debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    }
    
    if (errors['maxlength']) {
      return `${label} no puede exceder ${errors['maxlength'].requiredLength} caracteres`;
    }
    
    if (errors['min']) {
      if (fieldName === 'anioLanzamiento') {
        return `El año debe ser mayor o igual a ${this.minYear}`;
      }
      return `El valor mínimo es ${errors['min'].min}`;
    }
    
    if (errors['max']) {
      if (fieldName === 'anioLanzamiento') {
        return `El año no puede ser mayor a ${this.maxYear}`;
      }
      return `El valor máximo es ${errors['max'].max}`;
    }
    
    if (errors['pattern']) {
      if (fieldName === 'anioLanzamiento') {
        return 'Ingresa un año válido (4 dígitos)';
      }
      if (fieldName === 'calificacion') {
        return 'Ingresa un número entero entre 0 y 10';
      }
      return 'El formato es inválido';
    }
    
    if (errors['futureDate']) {
      return 'La fecha no puede ser futura';
    }

    return 'Este campo tiene un error';
  }

  // Helper para saber si un campo tiene error
  hasError(fieldName: string): boolean {
    const control = this.gameForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  // Helper para obtener el estado de un campo
  getFieldClass(fieldName: string): string {
    const control = this.gameForm.get(fieldName);
    if (!control || !control.touched) return '';
    return control.invalid ? 'is-invalid' : 'is-valid';
  }
}