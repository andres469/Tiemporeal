import { Component, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Bano: boolean = false;
  Cocina: boolean = false;
  Dormitorio: boolean = false;
  Sala: boolean = false;

  constructor(private database: Database) {}

  ngOnInit() {
    const route = ref(this.database,"/casa");
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);

      // Obtener el estado del baño, cocina, dormitorio y sala
      const estadoBano = valores_db.Baño;
      const estadoCocina = valores_db.Cocina;
      const estadoDormitorio = valores_db.Dormitorio;
      const estadoSala = valores_db.Sala;

      // Cambiar el color del cuadrado dependiendo del estado de cada habitación
      this.cambiarColorCuadrado(estadoBano, 'cuadrado');
      this.cambiarColorCuadrado(estadoCocina, 'cuadradoCocina');
      this.cambiarColorCuadrado(estadoDormitorio, 'cuadradoDormitorio');
      this.cambiarColorCuadrado(estadoSala, 'cuadradoSala');
    });
  }

  cambiarColorCuadrado(estado: boolean, idCuadrado: string) {
    const cuadrado = document.getElementById(idCuadrado);
    if (cuadrado) {
      cuadrado.style.backgroundColor = estado ? '#e74c3c' : '#3498db'; // Rojo si está encendido, azul si está apagado
    }
  }
}
