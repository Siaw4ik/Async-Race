import Garage from "../model/Garage";
import PagesView from "./pageView";
import { State, Car } from "../types";

export default class DrawCar {
  garage = new Garage();

  page = new PagesView();

  async drawCars(page: number) {
    const carsPerPage = 7;

    (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
    this.garage.getCars("/garage", page, carsPerPage).then((data) => {
      data.forEach((car) => this.drawCar(car));
      this.updateStorageCarsAmount(this.getState().totalCars);
      this.refreshStats();
    });
  }

  async drawCar(car: Car) {
    this.page.createCar(car.name, car.color, car.id);
    (document.querySelector(
      `#remove-${car.id}`
    ) as HTMLElement).addEventListener("click", () => {
      console.log(car.id);
      this.deleteCar(car.id);
      (document.querySelector(`#car-${car.id}`) as HTMLElement).remove();
    });
    (document.querySelector(
      `#select-${car.id}`
    ) as HTMLElement).addEventListener("click", () => {
      console.log(car.id);
      (document.querySelector(".update_input") as HTMLInputElement).value =
        car.name;
      (document.querySelector(
        ".update_input"
      ) as HTMLInputElement).dataset.id = `${car.id}`;
      (document.querySelector(
        ".update_color_input"
      ) as HTMLInputElement).value = car.color;
    });
  }

  async addCar(carColor: string, carName: string) {
    this.garage.postCar(carColor, carName, "/garage");
  }

  generateCars() {
    const randomCarArr = [
      "Tesla",
      "BelAZ",
      "KIA",
      "Opel",
      "Lada",
      "Honda",
      "Mazda",
      "Ford",
      "Doodge",
      "VAZ",
      "Volvo",
      "Audi",
      "VW",
      "Mercedes",
      "Skoda",
      "Lamba",
      "Geely",
      "Ravon",
      "Citroen",
      "Pegeuot",
    ];
    const randomNameArr = [
      "Slawa",
      "Max",
      "Dima",
      "Peter",
      "Jim",
      "Bob",
      "Alex",
      "John",
      "Bim",
      "Viktor",
      "Gek",
      "Den",
      "Steve",
      "Stewe",
      "Johnus",
      "Dom",
      "Zohan",
      "Toretto",
      "Hobs",
      "Banny",
    ];
    const arrFetch = [];
    for (let i = 1; i <= 100; i += 1) {
      const randomAColor = Math.floor(Math.random() * 255);
      const randomBColor = Math.floor(Math.random() * 255);
      const randomCColor = Math.floor(Math.random() * 255);
      const randomName = randomNameArr[Math.floor(Math.random() * 20)];
      const randomCar = randomCarArr[Math.floor(Math.random() * 20)];
      const carColor = `rgb(${randomAColor}, ${randomBColor}, ${randomCColor})`;
      const carName = `${randomCar} ${randomName}`;

      arrFetch.push(
        fetch("http://127.0.0.1:3000/garage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: carName, color: carColor }),
        })
      );
    }
    return Promise.all(arrFetch);
  }

  refreshStats() {
    const state = this.getState();

    (document.querySelector(".page") as HTMLElement).textContent = `Page #${
      state.currentPage > 0 ? state.currentPage : 1
    }`;
    (document.querySelector(
      ".garage_volume"
    ) as HTMLElement).textContent = `Garage (${state.totalCars})`;
  }

  async updateCar(id: number, carColor: string, carName: string) {
    console.log("Click");
    this.garage.updateCar("/garage", id, carColor, carName);
  }

  async deleteCar(id: number) {
    console.log("Click");
    this.garage.deleteCar("/garage", id);
  }

  updateStorageCarsAmount(totalCars: number) {
    const state = this.getState();
    state.totalCars = totalCars;
    localStorage.setItem("state", JSON.stringify(state));
  }

  updateStorageCurrPage() {
    const state = this.getState();
    state.currentPage -= 1;
    localStorage.setItem("state", JSON.stringify(state));
  }

  getState() {
    const storage = localStorage.getItem("state");
    let state: State = {
      currentPage: 0,
      totalCars: 0,
    };
    if (typeof storage === "string" && storage.length > 0) {
      state = JSON.parse(storage);
    }
    return state;
  }
}
