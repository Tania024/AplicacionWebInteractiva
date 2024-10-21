import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../domain/Curso';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CursosService } from '../../servicio/cursos.service';

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
  selectedFile: File | null = null;
  nuevoCurso: Curso = {
    nombreCurso: '',
    nombreInstructor: '',
    fechaInicio: '',
    duracion: '',
    descripcion: '',
    imagen: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private cursosService: CursosService) {} 

  ngOnInit() {
    const cursoIndex = this.route.snapshot.queryParamMap.get('index'); // <-- Obtener el índice de la ruta (si existe)
    if (cursoIndex !== null) {
      this.cursoEditadoIndex = +cursoIndex; // <-- Convertir índice a número
      const cursosGuardados: Curso[] = this.cursosService.obtenerCursos();
      this.nuevoCurso = { ...cursosGuardados[this.cursoEditadoIndex] }; // <-- Cargar datos del curso a editar
    }
    this.cargarCursos();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nuevoCurso.imagen = e.target.result;  // Guardar imagen en base64
      };
      reader.readAsDataURL(this.selectedFile);  // Convertir a base64
    }
  }

  cargarCursos(filtro: string = '') {
    this.cursos = this.cursosService.buscarCursos(filtro);
  }

  buscarCursos() {
    this.cargarCursos(this.filtro);
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    console.log('Formulario enviado', this.nuevoCurso);
      

    // Validar campos
    const { nombreCurso, nombreInstructor, fechaInicio, duracion, descripcion, imagen } = this.nuevoCurso;
    if (!nombreCurso || !nombreInstructor || !fechaInicio || !duracion || !descripcion || !imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    if (fechaInicio < fechaActual) {
      alert("La fecha de inicio no puede ser anterior a hoy.");
      return;
    }

    this.cursosService.guardarCurso(this.nuevoCurso, this.cursoEditadoIndex);
    alert('¡Formulario enviado correctamente!');

    // Limpiar el formulario
    this.nuevoCurso = {
      nombreCurso: '',
      nombreInstructor: '',
      fechaInicio: '',
      duracion: '',
      descripcion: '',
      imagen: ''
    };
    this.selectedFile = null;
    this.router.navigate(['Curso']); // <-- Redirigir a la lista de cursos después de guardar
    this.cargarCursos();
  }

}
