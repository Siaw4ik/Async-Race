import Engine from "../model/Engine";
import Winners from "../model/Winners";
import { Winner } from "../types";
import WinnersTable from "./drawWinners";

export default class Drive {
  engine = new Engine();

  winners = new Winners();

  table = new WinnersTable();

  raceBoard: Winner[] = [];

  async startCarEngine(carId: number, status: string) {
    const selectedCar = document.querySelector(
      `#road_svg-car-${carId}`
    ) as HTMLElement;
    this.raceBoard = [];

    this.engine.startStopEngine(carId, status).then((result) => {
      const distance = window.innerWidth - 144;
      const carTime = (result.distance / result.velocity / 1000).toFixed(2);
      selectedCar.setAttribute(
        "style",
        `left: ${distance}px; transition: all ${carTime}s ease`
      );

      const btnA = document.querySelector(`.btn-A-${carId}`) as HTMLElement;
      btnA.setAttribute("is-clicked", "true");
      btnA.setAttribute("style", "color: black; border-color: black;");

      const btnB = document.querySelector(`.btn-B-${carId}`) as HTMLElement;
      btnB.setAttribute("is-clicked", "false");
      btnB.setAttribute("style", "color: red; border-color: red;");

      this.engine
        .switchCarEngineToDrive(carId, "drive")
        .catch((error) => {
          console.log(
            `Car-${carId} has been stopped suddenly. It's engine was broken down. With ${error}`
          );
          const info = (selectedCar as HTMLElement).getBoundingClientRect();

          selectedCar.setAttribute(
            "style",
            `left: ${info.left.toFixed(0)}px; transition: all 0s ease`
          );
        })
        .then((res) => {
          if (res) {
            if (this.raceBoard.length === 0) {
              this.raceBoard.push({
                id: carId,
                wins: 1,
                time: Number(carTime),
              });

              const name = (document.querySelector(
                `#car-${carId}`
              ) as HTMLElement).getAttribute("dataname");

              const color = (document.querySelector(
                `#car-${carId}`
              ) as HTMLElement).getAttribute("datacolor");

              this.showWinnerResult(name, carTime, "flex");
              this.winners
                .getWinner(carId)
                .then((data) => {
                  const numberWins = data.wins + 1;
                  const currentTime = data.time;
                  const bestTime =
                    this.raceBoard[0].time < currentTime
                      ? this.raceBoard[0].time
                      : currentTime;
                  this.winners
                    .updateWinner(carId, numberWins, bestTime)
                    .then(() => {
                      this.table.updateWinnerInWinnersTable(carId);
                    });
                })
                .catch(() => {
                  this.winners
                    .createWinner(carId, 1, Number(carTime))
                    .then(() => {
                      if (name && color) {
                        console.log("есть инфа о имени и цвете");
                        this.table.addWinnerToWinnersTable(carId, name, color);
                        if (document.querySelector(".removable_row")) {
                          (document.querySelector(
                            ".removable_row"
                          ) as HTMLElement).remove();
                        }
                      }
                    });
                });
            }
          }
        });
    });
  }

  async stopCarEngine(id: number, status: string) {
    this.engine
      .startStopEngine(id, status)
      .then(() => {
        const selectedCar = document.querySelector(
          `#road_svg-car-${id}`
        ) as HTMLElement;
        selectedCar.setAttribute("style", "unset");

        const btnB = document.querySelector(`.btn-B-${id}`) as HTMLElement;
        btnB.setAttribute("style", "color: black; border-color: black;");

        const btnA = document.querySelector(`.btn-A-${id}`) as HTMLElement;
        btnA.setAttribute(
          "style",
          "color: rgb(109, 225, 27); border-color: rgb(109, 225, 27);"
        );

        (document.querySelector(".show-winner") as HTMLElement).setAttribute(
          "style",
          "display: none;"
        );
      })
      .then(() => {
        const startEngineBtn = document.querySelector(
          `.btn-A-${id}`
        ) as HTMLElement;
        const stopEngineBtn = document.querySelector(
          `.btn-B-${id}`
        ) as HTMLElement;
        startEngineBtn.setAttribute("is-clicked", "false");
        stopEngineBtn.setAttribute("is-clicked", "true");

        const raceBtn = document.querySelector(".btn_race");
        const resetBtn = document.querySelector(".btn_reset");
        (raceBtn as HTMLElement).setAttribute("is-pushed", "false");
        (resetBtn as HTMLElement).setAttribute("is-pushed", "true");
      });
  }

  showWinnerResult(name: string | null, time: string, display: string) {
    const winnerShow = <HTMLElement>document.querySelector(".show-winner");
    const winnerCar = document.querySelector(".winner_car");
    const winnerTime = document.querySelector(".winner_time");

    (winnerCar as HTMLElement).textContent = `${name}`;
    (winnerTime as HTMLElement).textContent = `[${time}]s`;
    winnerShow.setAttribute("style", `display: ${display};`);
  }
}
