import "./style.css";
import DrawCar from "./components/view/drawCar";
import PagesView from "./components/view/pageView";
/* import Garage from "./components/model/Garage"; */

const state = {
  currentPage: 1,
  totalCars: 0,
};

localStorage.setItem("state", JSON.stringify(state));

const page = new PagesView();
page.createContainer();

const cars = new DrawCar();

const garagePageBtn = document.querySelector(".garage_btn");
const winnersPageBtn = document.querySelector(".winners_btn");

(garagePageBtn as HTMLElement).addEventListener("click", () => {
  page.showPageElements("garage_page", "winners_page");
});
(winnersPageBtn as HTMLElement).addEventListener("click", () => {
  page.showPageElements("winners_page", "garage_page");
});

cars.drawCars(state.currentPage);
cars.refreshStats();

(document.querySelector(".btn_generate") as HTMLElement).addEventListener(
  "click",
  () => {
    cars.generateCars().then(() => {
      cars.drawCars(cars.getState().currentPage);
    });
  }
);

let createColor: string = "rgb(0, 0, 0)";
let creteName: string;

let updateColor: string;
let updateName: string;

document.querySelector(".color_input")?.addEventListener("input", () => {
  createColor = (document.querySelector(".color_input") as HTMLInputElement)
    .value;
  console.log(createColor);
});
document.querySelector(".create_input")?.addEventListener("input", () => {
  creteName = (document.querySelector(".create_input") as HTMLInputElement)
    .value;
  console.log(creteName);
});
document.querySelector(".update_color_input")?.addEventListener("input", () => {
  updateColor = (document.querySelector(
    ".update_color_input"
  ) as HTMLInputElement).value;
  console.log(updateColor);
});
document.querySelector(".update_input")?.addEventListener("input", () => {
  updateName = (document.querySelector(".update_input") as HTMLInputElement)
    .value;
  console.log(updateName);
});

document.querySelector(".create_btn")?.addEventListener("click", () => {
  if (creteName) {
    console.log("create");
    cars.addCar(createColor, creteName);
    (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
    cars.drawCars(cars.getState().currentPage);
    cars.refreshStats();
  }
});

document.querySelector(".update_btn")?.addEventListener("click", () => {
  console.log("click update");
  updateColor = (document.querySelector(
    ".update_color_input"
  ) as HTMLInputElement).value;
  updateName = (document.querySelector(".update_input") as HTMLInputElement)
    .value;
  const updateId = (document.querySelector(
    ".update_input"
  ) as HTMLInputElement).getAttribute("data-id");

  cars.updateCar(Number(updateId), updateColor, updateName);
  (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
  cars.drawCars(cars.getState().currentPage);
});

(document.querySelector(".garage_btn-prev") as HTMLElement).addEventListener(
  "click",
  () => {
    const currentState = cars.getState();
    if (currentState.currentPage > 1) {
      currentState.currentPage -= 1;
      state.currentPage -= 1;
      localStorage.setItem("state", JSON.stringify(currentState));
      console.log(currentState.currentPage);
      (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";

      cars.drawCars(currentState.currentPage);
      cars.refreshStats();
    }
  }
);

(document.querySelector(".garage_btn-next") as HTMLElement).addEventListener(
  "click",
  async () => {
    const currentState = cars.getState();
    const maxPage = Math.ceil(Number(currentState.totalCars) / 7);
    if (currentState.currentPage < maxPage) {
      currentState.currentPage += 1;
      state.currentPage += 1;
      localStorage.setItem("state", JSON.stringify(currentState));
      console.log(currentState.currentPage);
      (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";

      cars.drawCars(currentState.currentPage);
      cars.refreshStats();
    }
  }
);
