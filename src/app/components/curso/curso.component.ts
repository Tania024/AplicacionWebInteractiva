import { Component, OnInit } from '@angular/core';
import { Curso } from '../../domain/Curso';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgregarCursoComponent } from '../agregar-curso/agregar-curso.component';
import { Router } from '@angular/router'; // <-- Importar Router para navegar

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [FormsModule, CommonModule, AgregarCursoComponent],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.scss'
})
export class CursoComponent implements OnInit{
  cursos: Curso[] = [];
  filtro: string = '';
  cursoEditadoIndex: number | null = null;
  nuevoCurso: Curso = {
    nombreCurso: '',
    nombreInstructor: '',
    fechaInicio: '',
    duracion: '',
    descripcion: '',
    imagen: ''
  };

  constructor(private router: Router) {} // <-- Agregar Router para redirigir

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

  toggleDetalles(index: number) {
    const detalles = document.getElementById(`detalles-${index}`);
    const btnDetalles = document.getElementById(`btnDetalles-${index}`);
    if (detalles && btnDetalles) {
      if (detalles.style.display === "none" || detalles.style.display === "") {
        detalles.style.display = "block";
        btnDetalles.textContent = "Mostrar menos";
      } else {
        detalles.style.display = "none";
        btnDetalles.textContent = "Ver más detalles";
      }
    }
  }

  eliminarCurso(index: number) {
    if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      this.cursos.splice(index, 1);
      localStorage.setItem('cursos', JSON.stringify(this.cursos));
      this.cargarCursos(); // Recargar la lista de cursos
    }
  }

  editarCurso(index: number) {
    this.router.navigate(['AgregarCursos'], { queryParams: { index } });
  }  

}
