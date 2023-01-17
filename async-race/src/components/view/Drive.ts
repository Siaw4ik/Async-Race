import Engine from "../model/Engine";

export default class Drive {
  engine = new Engine();

  async startCarEngine(carId: number, status: string) {
    const selectedCar = document.querySelector(
      `#road_svg-car-${carId}`
    ) as HTMLElement;

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

      this.engine.switchCarEngineToDrive(carId, "drive").catch((error) => {
        console.log(
          `Car-${carId} has been stopped suddenly. It's engine was broken down. With ${error}`
        );
        const info = (selectedCar as HTMLElement).getBoundingClientRect();

        selectedCar.setAttribute(
          "style",
          `left: ${info.left.toFixed(0)}px; transition: all 0s ease`
        );
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
}
