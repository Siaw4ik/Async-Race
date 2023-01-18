import Garage from "../model/Garage";
import PagesView from "./pageView";
import { State, Car } from "../types";
import Drive from "./Drive";
import Winners from "../model/Winners";
import WinnersTable from "./drawWinners";

export default class DrawCar {
  garage = new Garage();

  page = new PagesView();

  drive = new Drive();

  winners = new Winners();

  table = new WinnersTable();

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
      this.deleteCar(car.id);
      (document.querySelector(`#car-${car.id}`) as HTMLElement).remove();

      if (
        (document.querySelector(".garage_cars") as HTMLElement).innerHTML === ""
      ) {
        this.updateStorageCurrPage();
        this.refreshStats();

        localStorage.setItem("state", JSON.stringify(this.getState()));
        (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
        this.drawCars(this.getState().currentPage);
        return;
      }

      (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
      this.drawCars(this.getState().currentPage);

      this.winners.deleteWinner(car.id).then(() => {
        const state = this.getState();
        state.totalWinnersCars -= 1;
        localStorage.setItem("state", JSON.stringify(state));
        (document.querySelector(
          ".winners_header_h2"
        ) as HTMLElement).textContent = `Winners (${state.totalWinnersCars})`;

        (document.querySelector(
          ".winners_header_p"
        ) as HTMLElement).textContent = `Page #${state.currentBoardPage}`;

        (document.querySelector(".tbody") as HTMLElement).innerHTML = "";

        if (state.sort === "") {
          this.winners.getWinners(state.currentBoardPage).then((winners) => {
            this.table.resultsProcessing(
              winners,
              (state.currentBoardPage - 1) * 10
            );
          });
        }

        if (state.sort) {
          this.winners
            .getSortedWinners(
              state.sort,
              state.orderInner,
              state.currentBoardPage
            )
            .then((result) => {
              this.table.resultsProcessing(
                result,
                (state.currentBoardPage - 1) * 10
              );
            });
        }
      });
    });

    (document.querySelector(
      `#select-${car.id}`
    ) as HTMLElement).addEventListener("click", () => {
      (document.querySelector(".update_input") as HTMLInputElement).value =
        car.name;
      (document.querySelector(
        ".update_input"
      ) as HTMLInputElement).dataset.id = `${car.id}`;
      (document.querySelector(
        ".update_color_input"
      ) as HTMLInputElement).value = car.color;
    });

    const startEngineBtn = document.querySelector(
      `.btn-A-${car.id}`
    ) as HTMLElement;
    const stopEngineBtn = document.querySelector(
      `.btn-B-${car.id}`
    ) as HTMLElement;

    startEngineBtn.addEventListener("click", () => {
      if (startEngineBtn.getAttribute("is-clicked") === "true") {
        console.log("Engine is already started!");
        return;
      }
      this.drive.startCarEngine(car.id, "started");
      startEngineBtn.setAttribute("is-clicked", "true");
      stopEngineBtn.setAttribute("is-clicked", "false");
    });

    stopEngineBtn.addEventListener("click", () => {
      if (stopEngineBtn.getAttribute("is-clicked") === "true") {
        console.log("Engine is already stopped!");
        return;
      }

      this.drive.stopCarEngine(car.id, "stopped");
      startEngineBtn.setAttribute("is-clicked", "false");
      stopEngineBtn.setAttribute("is-clicked", "true");
    });
  }

  async addCar(carColor: string, carName: string) {
    this.garage.postCar(carColor, carName, "/garage");
    this.refreshStats();
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

    (document.querySelector(".garage_p") as HTMLElement).textContent = `Page #${
      state.currentPage > 0 ? state.currentPage : 1
    }`;
    (document.querySelector(
      ".garage_h2"
    ) as HTMLElement).textContent = `Garage (${state.totalCars})`;
  }

  async updateCar(id: number, carColor: string, carName: string) {
    this.garage.updateCar("/garage", id, carColor, carName);
  }

  async deleteCar(id: number) {
    this.garage.deleteCar("/garage", id);
    this.updateStorageCarsAmount(this.getState().totalCars - 1);
    this.refreshStats();
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
      currentBoardPage: 1,
      totalWinnersCars: 0,
      sort: "",
      order: "",
      orderInner: "",
    };
    if (typeof storage === "string" && storage.length > 0) {
      state = JSON.parse(storage);
    }
    return state;
  }
}
