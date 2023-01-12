import Garage from "../model/Garage";
import PagesView from "./pageView";

export default class DrawCar {
  baseLink = "http://127.0.0.1:3000";

  garage = new Garage(this.baseLink);

  page = new PagesView();

  async drawCars() {
    const a = this.garage.getCars("/garage");
    a.then((data) =>
      data.forEach((car) => {
        this.page.createCar(car.name, car.color, car.id);
        const removeBtn = document.querySelector(`#remove-${car.id}`);
        console.log(removeBtn);
        removeBtn?.addEventListener("click", () => {
          console.log(car.id);
          this.deleteCar(car.id);
          (document.querySelector(`#car-${car.id}`) as HTMLElement).remove();
        });
        const selectBtn = document.querySelector(`#select-${car.id}`);
        selectBtn?.addEventListener("click", () => {
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
      })
    );
  }

  async drawCar(id: number) {
    const a = this.garage.getCars(`/garage/${id}`);
    a.then((car) => console.log(car));
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
      const randomA = Math.floor(Math.random() * 255);
      const randomB = Math.floor(Math.random() * 255);
      const randomC = Math.floor(Math.random() * 255);
      const randomName = randomNameArr[Math.floor(Math.random() * 20)];
      const randomCar = randomCarArr[Math.floor(Math.random() * 20)];
      const carColor = `rgb(${randomA}, ${randomB}, ${randomC})`;
      const carName = `${randomCar} ${randomName}`;
      /* this.garage.postCar(carColor, carName, "/garage"); */
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
    Promise.all(arrFetch);
  }

  async updateCar(id: number, carColor: string, carName: string) {
    console.log("Click");
    this.garage.updateCar("/garage", id, carColor, carName);
  }

  async deleteCar(id: number) {
    console.log("Click");
    this.garage.deleteCar("/garage", id);
  }
}
