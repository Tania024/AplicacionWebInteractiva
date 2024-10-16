import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../domain/Curso';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent  implements OnInit{
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
    this.cursoEditadoIndex = index;
    const curso = this.cursos[index];
    this.nuevoCurso = { ...curso };
    window.scrollTo(0, document.getElementById("agregarCursos")?.offsetTop || 0);
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
