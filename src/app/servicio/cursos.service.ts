import { Injectable } from '@angular/core';
import { Curso } from '../domain/Curso';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursosSubject = new BehaviorSubject<Curso[]>(this.obtenerCursos());
  cursos$ = this.cursosSubject.asObservable(); // Observable para suscribirse a cambios

  constructor() { }

  // Método para obtener todos los cursos
  obtenerCursos(): Curso[] {
    return JSON.parse(localStorage.getItem('cursos') || '[]');
  }

  // Método para agregar o actualizar un curso
  guardarCurso(curso: Curso, index: number | null): void {
    const cursos = this.obtenerCursos();

    if (index !== null) {
      cursos[index] = curso; // Actualizar curso existente
    } else {
      cursos.push(curso); // Agregar nuevo curso
    }

    localStorage.setItem('cursos', JSON.stringify(cursos));
    this.cursosSubject.next(cursos); // Emitir nuevos valores
  }

  // Método para buscar cursos con un filtro
  buscarCursos(filtro: string): Curso[] {
    const cursos = this.obtenerCursos();
    return cursos.filter((curso: Curso) =>
      curso.nombreCurso.toLowerCase().includes(filtro.toLowerCase()) ||
      curso.nombreInstructor.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
