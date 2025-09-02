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
const DATOS_TELEFONOS: Marca[] = [
  {
    "nombre": "Apple",
    "modelos": [
      { "modelo": "iPhone 15 / Pro / Pro Max", "compatible": true },
      { "modelo": "iPhone 14 / Pro / Pro Max", "compatible": true },
      { "modelo": "iPhone 13 / Mini / Pro", "compatible": true },
      { "modelo": "iPhone 12 / Mini / Pro", "compatible": true },
      { "modelo": "iPhone 11 / Pro", "compatible": true },
      { "modelo": "iPhone SE (2da y 3ra Gen)", "compatible": true },
      { "modelo": "iPhone X / XR / XS", "compatible": true },
      { "modelo": "iPhone 8 / 8 Plus", "compatible": true },
      { "modelo": "iPhone 7 / 7 Plus", "compatible": true },
      { "modelo": "iPhone 6 / 6S", "compatible": true },
      { "modelo": "iPhone 5 / 5S / 5C", "compatible": true },
      { "modelo": "iPhone 4S", "compatible": false },
      { "modelo": "iPhone 4", "compatible": false }
    ]
  },
  {
    "nombre": "Samsung",
    "modelos": [
      { "modelo": "Galaxy S24 / S23 / S22 Series", "compatible": true },
      { "modelo": "Galaxy S21 / S20 Series", "compatible": true },
      { "modelo": "Galaxy Z Fold / Z Flip Series", "compatible": true },
      { "modelo": "Galaxy Note 20 / Note 10 Series", "compatible": true },
      { "modelo": "Galaxy A55 / A54 / A53", "compatible": true },
      { "modelo": "Galaxy A35 / A34 / A33", "compatible": true },
      { "modelo": "Galaxy A25 / A24 / A23", "compatible": true },
      { "modelo": "Galaxy A15 / A14 / A13", "compatible": true },
      { "modelo": "Galaxy A10 / A12 / A11", "compatible": true },
      { "modelo": "Galaxy A05 / A04 / A03", "compatible": true },
      { "modelo": "Galaxy A02 / A01", "compatible": false },
      { "modelo": "Galaxy M34", "compatible": true },
      { "modelo": "Galaxy J7 Prime", "compatible": false },
      { "modelo": "Galaxy J5", "compatible": false },
      { "modelo": "Galaxy Grand Prime", "compatible": false }
    ]
  },
  {
    "nombre": "Xiaomi",
    "modelos": [
      { "modelo": "Xiaomi 14 / 13T / 12", "compatible": true },
      { "modelo": "Redmi Note 13 Pro / 12 Pro", "compatible": true },
      { "modelo": "Redmi Note 11 / 10", "compatible": true },
      { "modelo": "POCO F6 / F5", "compatible": true },
      { "modelo": "POCO X6 Pro / X5 Pro", "compatible": true },
      { "modelo": "Redmi 9A", "compatible": false },
      { "modelo": "Redmi 8A", "compatible": false }
    ]
  },
  {
    "nombre": "Motorola",
    "modelos": [
      { "modelo": "Edge 50 / 40 / 30 Series", "compatible": true },
      { "modelo": "Razr 40 Ultra / 2022", "compatible": true },
      { "modelo": "Moto G Stylus (2024 / 2023)", "compatible": true },
      { "modelo": "Moto G Power 5G", "compatible": true },
      { "modelo": "Moto G84 / G73 / G54", "compatible": true },
      { "modelo": "Moto G Power (2022)", "compatible": true },
      { "modelo": "Moto E22 / E13", "compatible": false },
      { "modelo": "Moto E40", "compatible": false },
      { "modelo": "Moto E20", "compatible": false },
      { "modelo": "Moto E7", "compatible": false }
    ]
  },
  {
    "nombre": "Google",
    "modelos": [
      { "modelo": "Pixel 8 / 8 Pro / 8a", "compatible": true },
      { "modelo": "Pixel 7 / 7 Pro / 7a", "compatible": true },
      { "modelo": "Pixel 6 / 6 Pro / 6a", "compatible": true },
      { "modelo": "Pixel 5 / 5a", "compatible": true }
    ]
  },
  {
    "nombre": "Huawei",
    "modelos": [
      { "modelo": "P60 Pro / P50 Pro", "compatible": true },
      { "modelo": "Mate 60 / 50 Series", "compatible": true },
      { "modelo": "Nova 12 / 11 / 10 Series", "compatible": true },
      { "modelo": "Y9a / Y8p", "compatible": true }
    ]
  },
  {
    "nombre": "Oppo",
    "modelos": [
      { "modelo": "Find X7 / X6 Series", "compatible": true },
      { "modelo": "Reno 11 / 10 Series", "compatible": true },
      { "modelo": "A98 / A78", "compatible": true }
    ]
  },
  {
    "nombre": "Vivo",
    "modelos": [
      { "modelo": "X100 / X90 Series", "compatible": true },
      { "modelo": "V30 / V29", "compatible": true },
      { "modelo": "Y36", "compatible": true }
    ]
  },
  {
    "nombre": "Honor",
    "modelos": [
      { "modelo": "Magic6 / Magic5 Series", "compatible": true },
      { "modelo": "Honor 90 / 70", "compatible": true }
    ]
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="main-container">
      <div class="card-container">
        
        <!-- Encabezado -->
        <div class="header">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.394 8.111a15 15 0 0121.212 0"></path></svg>
          <h1 class="title">Verificador de Wi-Fi 5 GHz</h1>
          <p class="subtitle">¿Tu teléfono es compatible con la red de 5.8 GHz?</p>
        </div>

        <!-- Selectores -->
        <div class="selectors-grid">
          <div class="selector-item">
            <label for="marca" class="selector-label">1. Selecciona la Marca</label>
            <select id="marca" [(ngModel)]="marcaSeleccionada" (ngModelChange)="onMarcaChange()">
              <option [ngValue]="undefined" disabled>-- Elige una marca --</option>
              <option *ngFor="let marca of marcas" [ngValue]="marca">{{ marca.nombre }}</option>
            </select>
          </div>
          <div class="selector-item">
            <label for="modelo" class="selector-label">2. Selecciona el Modelo</label>
            <select id="modelo" [(ngModel)]="modeloSeleccionado" (ngModelChange)="onModeloChange()" [disabled]="!marcaSeleccionada">
              <option [ngValue]="undefined" disabled>-- Elige un modelo --</option>
              <option *ngFor="let modelo of modelosDisponibles" [ngValue]="modelo">{{ modelo.modelo }}</option>
            </select>
          </div>
        </div>

        <!-- Área de Resultado -->
        <div *ngIf="resultado !== null" class="result-area">
          <div 
            [ngClass]="{
              'result-compatible': resultado?.compatible, 
              'result-incompatible': resultado && !resultado.compatible,
              'result-hidden': !resultado
            }"
          >
            <ng-container *ngIf="resultado?.compatible">
              <h3 class="result-title result-title-compatible">✅ ¡Compatible!</h3>
              <p class="result-text">Este modelo puede conectarse a redes Wi-Fi de 5 GHz.</p>
            </ng-container>
            <ng-container *ngIf="resultado && !resultado.compatible">
              <h3 class="result-title result-title-incompatible">❌ No Compatible</h3>
              <p class="result-text">Este modelo solo funciona con la red Wi-Fi de 2.4 GHz.</p>
            </ng-container>
          </div>
        </div>
      </div>
      <footer class="footer">
        <p>Creado con Angular y CSS.</p>
      </footer>
    </div>
  `,
  styles: [`
    /* Estilos generales */
    :host {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
        background-color: #1a202c;
    }

    .main-container {
      background-color: #1a202c; /* Fondo oscuro */
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #f3f4f6;
    }

    .card-container {
      width: 100%;
      max-width: 32rem;
      background-color: rgba(26, 32, 44, 0.9); /* Fondo semitransparente */
      backdrop-filter: blur(15px); /* Efecto de cristal esmerilado */
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(75, 85, 99, 0.3);
      border-radius: 1.5rem;
      padding: 2.5rem;
      border: 1px solid rgba(75, 85, 99, 0.3);
    }

    .header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1rem;
      color: #3b82f6; /* Color azul claro */
    }

    .title {
      font-size: 2rem;
      font-weight: 800;
      color: #e5e7eb;
      letter-spacing: -0.05em;
    }

    .subtitle {
      color: #9ca3af;
      margin-top: 0.5rem;
    }

    /* Estilos de selectores */
    .selectors-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    @media (min-width: 640px) {
      .selectors-grid {
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
      }
    }

    .selector-item {
      flex: 1;
    }

    .selector-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #d1d5db;
      margin-bottom: 0.75rem;
    }

    select {
      width: 100%;
      background-color: rgba(31, 41, 55, 0.7);
      border: 1px solid #4b5563;
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      color: #f3f4f6;
      transition: all 0.3s ease;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      cursor: pointer;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>');
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1.25rem;
    }

    select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
    }

    select:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      filter: grayscale(1);
    }

    /* Área de resultados */
    .result-area {
      margin-top: 1rem;
    }

    .result-box {
      border-radius: 1rem;
      padding: 2rem;
      text-align: center;
      transition: all 0.5s ease-in-out;
    }

    .result-compatible {
      background-color: rgba(34, 197, 94, 0.15);
      border: 1px solid #22c55e;
    }

    .result-incompatible {
      background-color: rgba(239, 68, 68, 0.15);
      border: 1px solid #ef4444;
    }

    .result-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .result-title-compatible {
      color: #86efac;
    }

    .result-title-incompatible {
      color: #fca5a5;
    }

    .result-text {
      color: #a1a1aa;
      font-size: 1rem;
    }

    /* Pie de página */
    .footer {
      text-align: center;
      margin-top: 2rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {
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
