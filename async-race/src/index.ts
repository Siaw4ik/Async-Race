import "./style.css";
import DrawCar from "./components/view/drawCar";
import PagesView from "./components/view/pageView";
import Drive from "./components/view/Drive";
import Winners from "./components/model/Winners";
import WinnersTable from "./components/view/drawWinners";

const state = {
  currentPage: 1,
  totalCars: 0,
  currentBoardPage: 1,
  totalWinnersCars: 0,
  sort: "",
  order: "",
  orderInner: "",
};

localStorage.setItem("state", JSON.stringify(state));

const page = new PagesView();
page.createContainer();

const cars = new DrawCar();

const drive = new Drive();

const winners = new Winners();
/* winners.deleteWinner(1); */

const table = new WinnersTable();

const garagePageBtn = document.querySelector(".garage_btn");
const winnersPageBtn = document.querySelector(".winners_btn");

(garagePageBtn as HTMLElement).addEventListener("click", () => {
  (document.querySelector(".garage_page") as HTMLElement).setAttribute(
    "style",
    "visibility: visible;"
  );
  (document.querySelector(".winners_page") as HTMLElement).classList.remove(
    "active"
  );
});
(winnersPageBtn as HTMLElement).addEventListener("click", () => {
  (document.querySelector(".garage_page") as HTMLElement).setAttribute(
    "style",
    "visibility: hidden;"
  );
  (document.querySelector(".winners_page") as HTMLElement).classList.add(
    "active"
  );
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
let createName: string;

let updateColor: string;
let updateName: string;

document.querySelector(".color_input")?.addEventListener("input", () => {
  createColor = (document.querySelector(".color_input") as HTMLInputElement)
    .value;
});
document.querySelector(".create_input")?.addEventListener("input", () => {
  createName = (document.querySelector(".create_input") as HTMLInputElement)
    .value;
});
document.querySelector(".update_color_input")?.addEventListener("input", () => {
  updateColor = (document.querySelector(
    ".update_color_input"
  ) as HTMLInputElement).value;
});
document.querySelector(".update_input")?.addEventListener("input", () => {
  updateName = (document.querySelector(".update_input") as HTMLInputElement)
    .value;
});

document.querySelector(".create_btn")?.addEventListener("click", () => {
  if (createName) {
    cars.addCar(createColor, createName);
    (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
    cars.drawCars(cars.getState().currentPage);
    cars.refreshStats();
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

  cars.updateCar(Number(updateId), updateColor, updateName);
  (document.querySelector(".garage_cars") as HTMLElement).innerHTML = "";
  cars.drawCars(cars.getState().currentPage);

  const tableRow = document.querySelector(`.id-row-${Number(updateId)}`);
  if (tableRow) {
    tableRow
      .querySelector(`#svg-car-${updateId}`)
      ?.setAttribute("fill", updateColor);
    (tableRow.querySelector(
      ".td_name"
    ) as HTMLElement).textContent = updateName;
  }
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

const raceBtn = document.querySelector(".btn_race");
const resetBtn = document.querySelector(".btn_reset");

(raceBtn as HTMLElement).addEventListener("click", () => {
  if (raceBtn?.getAttribute("is-pushed") === "true") {
    console.log("All engines are already started");
    return;
  }
  document.querySelectorAll(".car").forEach((elem) => {
    const carId = elem.getAttribute("id")?.slice(13);
    drive.startCarEngine(Number(carId), "started");
  });

  (raceBtn as HTMLElement).setAttribute("is-pushed", "true");
  (resetBtn as HTMLElement).setAttribute("is-pushed", "false");
});

(resetBtn as HTMLElement).addEventListener("click", () => {
  console.log("STOP RACE!!! Return all Car!!!");
  if (resetBtn?.getAttribute("is-pushed") === "true") {
    console.log("All engines are already stopped");
    return;
  }
  document.querySelectorAll(".car").forEach((elem) => {
    const carId = elem.getAttribute("id")?.slice(13);
    drive.stopCarEngine(Number(carId), "stopped");
  });
  (raceBtn as HTMLElement).setAttribute("is-pushed", "false");
  (resetBtn as HTMLElement).setAttribute("is-pushed", "true");
});

let order: string = "ASC";
let orderInner: string;
let sort: string;

(document.querySelector(".winners_btn-prev") as HTMLElement).addEventListener(
  "click",
  () => {
    const currentState = cars.getState();
    if (currentState.currentBoardPage > 1) {
      currentState.currentBoardPage -= 1;
      state.currentBoardPage -= 1;
      currentState.orderInner = orderInner;
      localStorage.setItem("state", JSON.stringify(currentState));
      if (order === "DESC") {
        orderInner = "ASC";
      } else if (order === "ASC") {
        orderInner = "DESC";
      }

      (document.querySelector(".tbody") as HTMLElement).innerHTML = "";

      if (sort === undefined) {
        winners.getWinners(currentState.currentBoardPage).then((winner) => {
          table.resultsProcessing(
            winner,
            (currentState.currentBoardPage - 1) * 10
          );
        });
      }

      if (sort) {
        winners
          .getSortedWinners(sort, orderInner, currentState.currentBoardPage)
          .then((winner) => {
            table.resultsProcessing(
              winner,
              (currentState.currentBoardPage - 1) * 10
            );
          });
      }

      (document.querySelector(
        ".winners_header_p"
      ) as HTMLElement).textContent = `Page #${currentState.currentBoardPage}`;
    }
  }
);

(document.querySelector(".winners_btn-next") as HTMLElement).addEventListener(
  "click",
  async () => {
    const currentState = cars.getState();
    const maxPage = Math.ceil(Number(currentState.totalWinnersCars) / 10);
    if (currentState.currentBoardPage < maxPage) {
      if (order === "DESC") {
        orderInner = "ASC";
      } else if (order === "ASC") {
        orderInner = "DESC";
      }
      currentState.currentBoardPage += 1;
      state.currentBoardPage += 1;
      currentState.orderInner = orderInner;
      localStorage.setItem("state", JSON.stringify(currentState));
      console.log(currentState.currentBoardPage);

      (document.querySelector(".tbody") as HTMLElement).innerHTML = "";

      if (sort === undefined) {
        winners.getWinners(currentState.currentBoardPage).then((winner) => {
          table.resultsProcessing(
            winner,
            (currentState.currentBoardPage - 1) * 10
          );
        });
      }

      if (sort) {
        winners
          .getSortedWinners(sort, orderInner, currentState.currentBoardPage)
          .then((result) => {
            table.resultsProcessing(
              result,
              (currentState.currentBoardPage - 1) * 10
            );
          });
      }

      (document.querySelector(
        ".winners_header_p"
      ) as HTMLElement).textContent = `Page #${currentState.currentBoardPage}`;
    }
  }
);

const deleteRow = document.querySelector(".removable_row") as HTMLElement;
if (deleteRow) {
  winners.deleteWinner(1);
}

winners.getWinners().then((winner) => {
  if (winner.length > 0) {
    if (deleteRow) {
      deleteRow.remove();
    }
    table.resultsProcessing(winner, 0);
  }
});

(document.querySelector(".th_time") as HTMLElement).addEventListener(
  "click",
  () => {
    const currentState = cars.getState();
    state.currentBoardPage = currentState.currentBoardPage;
    sort = "time";
    (document.querySelector(".tbody") as HTMLElement).innerHTML = "";
    winners
      .getSortedWinners(sort, order, state.currentBoardPage)
      .then((result) => {
        table.resultsProcessing(result, (state.currentBoardPage - 1) * 10);
      });
    if (order === "ASC") {
      order = "DESC";
    } else if (order === "DESC") {
      order = "ASC";
    }

    currentState.sort = sort;
    currentState.order = order;
    localStorage.setItem("state", JSON.stringify(currentState));
  }
);

(document.querySelector(".th_wins") as HTMLElement).addEventListener(
  "click",
  () => {
    const currentState = cars.getState();
    state.currentBoardPage = currentState.currentBoardPage;
    sort = "wins";
    (document.querySelector(".tbody") as HTMLElement).innerHTML = "";
    winners
      .getSortedWinners(sort, order, currentState.currentBoardPage)
      .then((result) => {
        table.resultsProcessing(
          result,
          (currentState.currentBoardPage - 1) * 10
        );
      });
    if (order === "ASC") {
      order = "DESC";
    } else if (order === "DESC") {
      order = "ASC";
    }

    currentState.sort = sort;
    currentState.order = order;
    localStorage.setItem("state", JSON.stringify(currentState));
  }
);
