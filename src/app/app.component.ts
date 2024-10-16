import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InicioComponent,  PiePaginaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aplicacionWebInteractiva';
}
