import "./style.css";
import DrawCar from "./components/view/drawCar";

const a = new DrawCar();
a.drawCars();
a.drawCar(2);
a.drawCar(1);
a.drawCar(3);
a.drawCar(4);
// a.drawCar(5);
a.addCar("purple", "ZIZER");
a.updateCar(12, "QWERTY", "My");
a.deleteCar(12);
a.deleteCar(11);
a.deleteCar(10);
a.deleteCar(16);

console.log("Hello World!");

/* async function getCars(baseLink: string, optionLink: string) {
  const response = await fetch(`${baseLink}${optionLink}`);
  const data = await response.json();
  return data;
}

console.log(getCars("http://127.0.0.1:3000", "/garage")); */
