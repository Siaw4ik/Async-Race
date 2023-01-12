import { Car } from "../types";

export default class Garage {
  baseLink: string;

  constructor(baseLink: string) {
    this.baseLink = baseLink;
  }

  async getCars(optionLink: string): Promise<Car[]> {
    const response = await fetch(`${this.baseLink}${optionLink}`);
    const data = await response.json();
    return data;
  }

  async postCar(carColor: string, carName: string, optionLink: string) {
    const response = await fetch(`${this.baseLink}${optionLink}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: carName, color: carColor }),
    });

    if (response.ok) {
      console.log(response.status);
      console.log(await response.json());
    } else {
      console.log(`Error HTTP: ${response.status}`);
    }
  }

  async updateCar(
    optionLink: string,
    id: number,
    carColor: string,
    carName: string
  ) {
    const response = await fetch(`${this.baseLink}${optionLink}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: carName, color: carColor }),
    });

    if (response.ok) {
      console.log(response.status);
    } else {
      console.log(`Error HTTP: ${response.status}`);
      console.log("error");
    }
  }

  async deleteCar(optionLink: string, id: number) {
    const response = await fetch(`${this.baseLink}${optionLink}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(response.status);
    } else {
      console.log(`Error HTTP: ${response.status}`);
    }
  }
}
