import { Component, inject } from "@angular/core";
import { HousingLocation } from "../housinglocation";
import { HousingService } from "../housing.service";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-form-casas",
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="formCasas"
      (submit)="submit()"
      class="container mt-5 p-4 bg-white shadow rounded"
    >
      <h2 class="mb-4 text-center text-primary">Registro de Casas</h2>

      <div class="card p-4 mt-4 border-0 shadow-sm">
        <h5 class="card-title text-center text-secondary">Datos de la casa</h5>

        <div class="mb-3">
          <label for="nombre" class="form-label fw-bold">Nombre:</label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            placeholder="Nombre"
            formControlName="name"
          />
        </div>

        <div class="mb-3">
          <label for="cuidad" class="form-label fw-bold">Ciudad:</label>
          <input
            type="text"
            id="cuidad"
            class="form-control"
            placeholder="ciudad"
            formControlName="ciudad"
          />
        </div>

        <div class="mb-3">
          <label for="state" class="form-label fw-bold">State:</label>
          <input
            type="text"
            id="state"
            class="form-control"
            rows="3"
            placeholder="state"
            formControlName="state"
          />
        </div>

        <div class="mb-3">
          <label for="photo" class="form-label fw-bold">photo:</label>
          <input
            type="text"
            id="photo"
            class="form-control"
            rows="3"
            placeholder="photo"
            formControlName="photo"
          />
        </div>

        <div class="mb-3">
          <label for="availableUnits" class="form-label fw-bold"
            >availableUnits:</label
          >
          <input
            type="number"
            id="availableUnits"
            class="form-control"
            rows="3"
            placeholder="availableUnits"
            formControlName="availableUnits"
          />
        </div>

        <div class="mb-3">
          <label for="wifi" class="form-label fw-bold">wifi:</label>
          <input
            type="checkbox"
            id="wifi"
            class="form-control"
            rows="3"
            placeholder="wifi"
            formControlName="wifi"
          />
        </div>

        <div class="mb-3">
          <label for="laundry" class="form-label fw-bold">laundry:</label>
          <input
            type="checkbox"
            id="laundry"
            class="form-control"
            rows="3"
            placeholder="laundry"
            formControlName="laundry"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">seguridad:</label>
          <div class="d-flex justify-content-center gap-3">
            <div class="form-check">
              <input
                type="checkbox"
                id="alarmas"
                value="alarmas"
                name="seguridad"
                class="form-check-input"
                formControlName="alarmas"
              />
              <label for="alarmas" class="form-check-label"> alarmas </label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="camaras"
                value="camaras"
                name="seguridad"
                class="form-check-input"
                formControlName="camaras"
              />
              <label for="camaras" class="form-check-label"> camaras </label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="puertaReforzada"
                value="puertaReforzada"
                name="seguridad"
                class="form-check-input"
                formControlName="puertaReforzada"
              />
              <label for="puertaReforzada" class="form-check-label">
                puertaReforzada
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button
          type="submit"
          class="btn btn-primary px-4 py-2 fw-bold shadow-sm"
        >
          Registrar Casa
        </button>
      </div>
    </form>
  `,
  styles: ``,
})
export class FormCasasComponent {
  seguridadSelect: string[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  formCasas: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formCasas = this.fb.group({
      name: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      photo: [""],
      availableUnits: ["", [Validators.required]],
      wifi: ["", [Validators.required]],
      laundry: ["", [Validators.required]],
      coordinates: [""],
      alarmas: [""],
      camaras: [""],
      puertaReforzada: [""],
    });

    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
      });
  }

  submit() {
    const nuevoCasa: HousingLocation = {
      id: this.housingLocationList.length + 1,
      name: this.formCasas.value.name,
      city: this.formCasas.value.city,
      state: this.formCasas.value.state,
      photo: this.formCasas.value.photo,
      availableUnits: this.formCasas.value.availableUnits,
      wifi: this.formCasas.value.wifi,
      laundry: this.formCasas.value.laundry,
      coordinates: this.formCasas.value.coordinates,
      seguridad: this.seguridad(),
    };

    this.housingService.addCasa(nuevoCasa);

    this.formCasas.reset();
  }

  seguridad(){
    if(this.formCasas.value.alarmas){
      this.seguridadSelect.push('alarmas');
    }
    if(this.formCasas.value.camaras){
      this.seguridadSelect.push('camaras');
    }
    if(this.formCasas.value.puertaReforzada){
      this.seguridadSelect.push('puertaReforzada');
    }
    return this.seguridadSelect;
  };
}
