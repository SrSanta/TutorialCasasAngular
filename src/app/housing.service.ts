import { Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";
/* import { HttpClient } from "@angular/common/http"; */

@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:3000/locations";

  /* constructor(private http: HttpClient) { } */
  /* http: HttpClient = inject(HttpClient); */

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }

  addCasa(house: HousingLocation) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(house),
    }).then(response => response.json());
  }
}
