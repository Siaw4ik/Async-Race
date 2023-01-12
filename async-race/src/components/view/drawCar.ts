import Garage from "../model/Garage";

export default class DrawCar {
  baseLink = "http://127.0.0.1:3000";

  garage = new Garage(this.baseLink);

  async drawCars() {
    const a = this.garage.getCars("/garage");
    a.then((data) => data.forEach((car) => console.log(car)));
  }

  async drawCar(id: number) {
    const a = this.garage.getCars(`/garage/${id}`);
    a.then((car) => console.log(car));
  }

  async addCar(carColor: string, carName: string) {
    document.querySelector(".create")?.addEventListener("click", () => {
      console.log("Click");
      this.garage.createCar(carColor, carName, "/garage");
    });
  }

  async updateCar(id: number, carColor: string, carName: string) {
    document.querySelector(".update")?.addEventListener("click", () => {
      console.log("Click");
      this.garage.updateCar("/garage", id, carColor, carName);
    });
  }

  async deleteCar(id: number) {
    document.querySelector(".delete")?.addEventListener("click", () => {
      console.log("Click");
      this.garage.deleteCar("/garage", id);
    });
  }
}
