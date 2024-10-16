import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../domain/Curso';

@Component({
  selector: 'app-agregar-curso',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.scss'
})
export class AgregarCursoComponent implements OnInit {
  cursos: Curso[] = [];
  filtro: string = '';
  cursoEditadoIndex: number | null = null;
  nuevoCurso: Curso = {
    nombreCurso: '',
    nombreInstructor: '',
    fechaInicio: '',
    duracion: '',
    descripcion: ''
  };

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos(filtro: string = '') {
    const cursosGuardados: Curso[] = JSON.parse(localStorage.getItem('cursos') || '[]');
    this.cursos = cursosGuardados.filter((curso: Curso) =>
      curso.nombreCurso.toLowerCase().includes(filtro.toLowerCase()) ||
      curso.nombreInstructor.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  buscarCursos() {
    this.cargarCursos(this.filtro);
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    console.log('Formulario enviado', this.nuevoCurso);
      

    // Validar campos
    const { nombreCurso, nombreInstructor, fechaInicio, duracion, descripcion } = this.nuevoCurso;
    if (!nombreCurso || !nombreInstructor || !fechaInicio || !duracion || !descripcion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    if (fechaInicio < fechaActual) {
      alert("La fecha de inicio no puede ser anterior a hoy.");
      return;
    }

    const cursos = JSON.parse(localStorage.getItem("cursos") || '[]');
    if (this.cursoEditadoIndex !== null) {
      cursos[this.cursoEditadoIndex] = this.nuevoCurso; // Editar
      this.cursoEditadoIndex = null; // Resetear
    } else {
      cursos.push(this.nuevoCurso); // Agregar
    }

    localStorage.setItem('cursos', JSON.stringify(cursos));
    alert('¡Formulario enviado correctamente!');

    // Limpiar el formulario
    this.nuevoCurso = {
      nombreCurso: '',
      nombreInstructor: '',
      fechaInicio: '',
      duracion: '',
      descripcion: ''
    };

    this.cargarCursos();
  }

}
