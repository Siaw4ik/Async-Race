import Garage from "../model/Garage";
import Winners from "../model/Winners";
import PagesView from "./pageView";
import { Winner, State } from "../types";

export default class WinnersTable {
  page = new PagesView();

  winner = new Winners();

  garage = new Garage();

  addWinnerToWinnersTable(carId: number, name: string, color: string) {
    const storage = localStorage.getItem("state");
    let state: State;
    if (typeof storage === "string" && storage.length > 0) {
      state = JSON.parse(storage);

      this.winner.getWinners(state.currentBoardPage).then((result) => {
        const bodyRows = document.querySelectorAll(".tbody tr");
        const arrayRows: number[] = [];

        if (bodyRows.length > 0) {
          bodyRows.forEach((elem) => {
            const rowId = (elem as HTMLElement).getAttribute("class")?.slice(7);
            if (rowId) {
              arrayRows.push(Number(rowId));
            }
          });
        }

        const isPresent: number | undefined = arrayRows.find(
          (elem) => elem === carId
        );

        if (bodyRows.length < 10 && isPresent === undefined) {
          const winnerCar = result.find((car) => car.id === carId);

          if (winnerCar !== undefined) {
            this.page.createTableRow(
              carId,
              (state.currentBoardPage - 1) * 10 + result.length,
              color,
              name,
              winnerCar.wins,
              winnerCar.time
            );
          }
        }
      });
    }
  }

  updateWinnerInWinnersTable(carId: number) {
    const storage = localStorage.getItem("state");
    let state: State;
    if (typeof storage === "string" && storage.length > 0) {
      state = JSON.parse(storage);

      this.winner.getWinners(state.currentBoardPage).then((result) => {
        const winnerCar = result.find((car) => car.id === carId);
        const row = document.querySelector(`.id-row-${carId}`) as HTMLElement;
        if (row) {
          (row.querySelector(".td_wins") as HTMLElement).textContent = String(
            winnerCar?.wins
          );
          (row.querySelector(".td_time") as HTMLElement).textContent = String(
            winnerCar?.time
          );
        }
      });
    }
  }

  resultsProcessing(winnersArr: Winner[], indexArr: number) {
    winnersArr.forEach((row, index) => {
      this.garage.getCar(row.id).then((winnerCar) => {
        this.page.createTableRow(
          row.id,
          indexArr + index + 1,
          winnerCar.color,
          winnerCar.name,
          row.wins,
          row.time
        );
      });
    });
  }
}
