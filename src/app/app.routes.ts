import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AgregarCursoComponent } from './components/agregar-curso/agregar-curso.component';
import { CursoComponent } from './components/curso/curso.component';

export const routes: Routes = [
    {path: "Inicio", component:InicioComponent},
    {path:"Curso", component:CursoComponent},
    {path:"AgregarCursos", component:AgregarCursoComponent},
    {path:"Contacto", component:ContactoComponent}
];
