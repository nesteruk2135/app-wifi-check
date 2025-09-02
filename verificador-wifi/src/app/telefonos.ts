import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- Interfaces para definir la estructura de nuestros datos ---
interface Telefono {
  modelo: string;
  compatible: boolean;
}

interface Marca {
  nombre: string;
  modelos: Telefono[];
}

// --- Base de datos de teléfonos ---
// Nota: Esta es una lista de ejemplo. Deberás expandirla con más modelos.
const DATOS_TELEFONOS: Marca[] = [
  {
    nombre: 'Apple',
    modelos: [
      { modelo: 'iPhone 15 / Pro / Pro Max', compatible: true },
      { modelo: 'iPhone 14 / Pro / Pro Max', compatible: true },
      { modelo: 'iPhone 13 / Mini / Pro', compatible: true },
      { modelo: 'iPhone 12 / Mini / Pro', compatible: true },
      { modelo: 'iPhone 11 / Pro', compatible: true },
      { modelo: 'iPhone SE (2da y 3ra Gen)', compatible: true },
      { modelo: 'iPhone X / XR / XS', compatible: true },
      { modelo: 'iPhone 8 / 8 Plus', compatible: true },
      { modelo: 'iPhone 7 / 7 Plus', compatible: true },
      { modelo: 'iPhone 6 / 6S', compatible: true },
      { modelo: 'iPhone 5 / 5S / 5C', compatible: true },
      { modelo: 'iPhone 4S', compatible: false },
      { modelo: 'iPhone 4', compatible: false },
    ]
  },
  {
    nombre: 'Samsung',
    modelos: [
      { modelo: 'Galaxy S24 / S23 / S22 Series', compatible: true },
      { modelo: 'Galaxy S21 / S20 Series', compatible: true },
      { modelo: 'Galaxy Z Fold / Z Flip Series', compatible: true },
      { modelo: 'Galaxy Note 20 / Note 10 Series', compatible: true },
      { modelo: 'Galaxy A55 / A54 / A53', compatible: true },
      { modelo: 'Galaxy A35 / A34 / A33', compatible: true },
      { modelo: 'Galaxy M34', compatible: true },
      { modelo: 'Galaxy J7 Prime', compatible: false },
      { modelo: 'Galaxy J5', compatible: false },
      { modelo: 'Galaxy Grand Prime', compatible: false },
    ]
  },
  {
    nombre: 'Xiaomi',
    modelos: [
      { modelo: 'Xiaomi 14 / 13T / 12', compatible: true },
      { modelo: 'Redmi Note 13 Pro / 12 Pro', compatible: true },
      { modelo: 'Redmi Note 11 / 10', compatible: true },
      { modelo: 'POCO F6 / F5', compatible: true },
      { modelo: 'POCO X6 Pro / X5 Pro', compatible: true },
      { modelo: 'Redmi 9A', compatible: false },
      { modelo: 'Redmi 8A', compatible: false },
    ]
  },
  {
    nombre: 'Motorola',
    modelos: [
        { modelo: 'Edge 50 / 40 / 30 Series', compatible: true },
        { modelo: 'Razr 40 Ultra / 2022', compatible: true },
        { modelo: 'Moto G84 / G73 / G54', compatible: true },
        { modelo: 'Moto G Power (2022)', compatible: true },
        { modelo: 'Moto E40', compatible: false },
        { modelo: 'Moto E20', compatible: false },
        { modelo: 'Moto E7', compatible: false },
    ]
  },
  {
    nombre: 'Google',
    modelos: [
        { modelo: 'Pixel 8 / 8 Pro / 8a', compatible: true },
        { modelo: 'Pixel 7 / 7 Pro / 7a', compatible: true },
        { modelo: 'Pixel 6 / 6 Pro / 6a', compatible: true },
        { modelo: 'Pixel 5 / 5a', compatible: true },
    ]
  }
];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gray-900 min-h-screen flex items-center justify-center font-sans p-4 text-white">
      <div class="w-full max-w-2xl">
        <div class="bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-10">
          
          <!-- Encabezado -->
          <div class="text-center mb-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.394 8.111a15 15 0 0121.212 0"></path></svg>
            <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Verificador de Wi-Fi 5 GHz</h1>
            <p class="text-gray-400 mt-2">¿Tu teléfono es compatible con la red de 5.8 GHz?</p>
          </div>

          <!-- Selectores -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label for="marca" class="block text-sm font-medium text-gray-300 mb-2">1. Selecciona la Marca</label>
              <select id="marca" [(ngModel)]="marcaSeleccionada" (ngModelChange)="onMarcaChange()"
                      class="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition">
                <option [ngValue]="undefined" disabled>-- Elige una marca --</option>
                <option *ngFor="let marca of marcas" [ngValue]="marca">{{ marca.nombre }}</option>
              </select>
            </div>
            <div>
              <label for="modelo" class="block text-sm font-medium text-gray-300 mb-2">2. Selecciona el Modelo</label>
              <select id="modelo" [(ngModel)]="modeloSeleccionado" (ngModelChange)="onModeloChange()" [disabled]="!marcaSeleccionada"
                      class="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed">
                <option [ngValue]="undefined" disabled>-- Elige un modelo --</option>
                <option *ngFor="let modelo of modelosDisponibles" [ngValue]="modelo">{{ modelo.modelo }}</option>
              </select>
            </div>
          </div>

          <!-- Área de Resultado -->
          <div *ngIf="resultado !== null" class="mt-6">
             <div 
                [ngClass]="{
                  'bg-green-500/20 border-green-500': resultado?.compatible, 
                  'bg-red-500/20 border-red-500': resultado && !resultado.compatible,
                  'border-transparent': !resultado
                }"
                class="border-l-4 p-5 rounded-lg text-center transition-all duration-300"
              >
                  <ng-container *ngIf="resultado?.compatible">
                      <h3 class="text-2xl font-bold text-green-400">✅ ¡Compatible!</h3>
                      <p class="text-gray-300 mt-1">Este modelo puede conectarse a redes Wi-Fi de 5 GHz.</p>
                  </ng-container>
                  <ng-container *ngIf="resultado && !resultado.compatible">
                      <h3 class="text-2xl font-bold text-red-400">❌ No Compatible</h3>
                      <p class="text-gray-300 mt-1">Este modelo solo funciona con la red Wi-Fi de 2.4 GHz.</p>
                  </ng-container>
             </div>
          </div>
        </div>
        <footer class="text-center mt-6 text-sm text-gray-500">
          <p>Creado con Angular y Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    /* Estilos personalizados adicionales si fueran necesarios */
    select {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" stroke="%239CA3AF"></polyline></svg>');
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.2em;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  marcas: Marca[] = DATOS_TELEFONOS;
  modelosDisponibles: Telefono[] = [];
  
  marcaSeleccionada: Marca | undefined;
  modeloSeleccionado: Telefono | undefined;
  
  resultado: Telefono | null = null;

  onMarcaChange(): void {
    this.modelosDisponibles = this.marcaSeleccionada ? this.marcaSeleccionada.modelos : [];
    this.modeloSeleccionado = undefined;
    this.resultado = null;
  }

  onModeloChange(): void {
     this.resultado = this.modeloSeleccionado || null;
  }
}

