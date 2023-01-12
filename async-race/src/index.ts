import "./style.css";
import DrawCar from "./components/view/drawCar";
import PagesView from "./components/view/pageView";
/* import Garage from "./components/model/Garage"; */

const page = new PagesView();
page.createContainer();

const a = new DrawCar();

const garagePageBtn = document.querySelector(".garage_btn");
const winnersPageBtn = document.querySelector(".winners_btn");

(garagePageBtn as HTMLElement).addEventListener("click", () => {
  page.showPageElements("garage_page", "winners_page");
});
(winnersPageBtn as HTMLElement).addEventListener("click", () => {
  page.showPageElements("winners_page", "garage_page");
});

a.drawCars();

const btnGenerate = document.querySelector(".btn_generate");
btnGenerate?.addEventListener("click", () => {
  a.generateCars();
  a.drawCars();
});

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
    a.addCar(createColor, creteName);
    (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
    a.drawCars();
  }
});

document.querySelector(".update_btn")?.addEventListener("click", () => {
  updateColor = (document.querySelector(
    ".update_color_input"
  ) as HTMLInputElement).value;
  updateName = (document.querySelector(".update_input") as HTMLInputElement)
    .value;
  const updateId = (document.querySelector(
    ".update_input"
  ) as HTMLInputElement).getAttribute("data-id");
  console.log(updateId);
  console.log(updateName);
  a.updateCar(Number(updateId), updateColor, updateName);
  (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
  a.drawCars();
});
