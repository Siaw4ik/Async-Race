import { Car, State } from "../types";

export default class Garage {
  async getCars(
    optionLink: string,
    page: number,
    limit: number
  ): Promise<Car[]> {
    const response = await fetch(
      `http://127.0.0.1:3000${optionLink}?_page=${page}&_limit=${limit}`
    );

    const carsAmount = response.headers.get("X-Total-Count");
    const storage = localStorage.getItem("state");
    let state: State;
    if (typeof storage === "string" && storage.length > 0) {
      state = JSON.parse(storage);
      state.totalCars = Number(carsAmount);
      localStorage.setItem("state", JSON.stringify(state));
    }

    const data = await response.json();
    return data;
  }

  async getCar(id: number): Promise<Car> {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
    const data = await response.json();

    if (response.status === 404) {
      console.log("Car isn't found in garage!");
    } else if (response.status === 200) {
      console.log("Car found!");
    }

    return data;
  }

  async postCar(carColor: string, carName: string, optionLink: string) {
    const response = await fetch(`http://127.0.0.1:3000${optionLink}`, {
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
    const response = await fetch(`http://127.0.0.1:3000${optionLink}/${id}`, {
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
    const response = await fetch(`http://127.0.0.1:3000${optionLink}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(response.status);
    } else {
      console.log(`Error HTTP: ${response.status}`);
    }
  }
}
