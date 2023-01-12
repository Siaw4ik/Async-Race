import "./style.css";
import DrawCar from "./components/view/drawCar";
import PagesView from "./components/view/pageView";
/* import Garage from "./components/model/Garage"; */

const page = new PagesView();

page.createContainer();

const a = new DrawCar();
/* const garage = new Garage("http://127.0.0.1:3000"); */

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
