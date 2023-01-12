import Garage from "../model/Garage";

export default class PagesView {
  baseLink = "http://127.0.0.1:3000";

  garage = new Garage(this.baseLink);

  async deleteCar(id: number) {
    document.querySelector(".delete")?.addEventListener("click", () => {
      console.log("Click");
      this.garage.deleteCar("/garage", id);
    });
  }

  showPageElements(show: string, hide: string) {
    document
      .querySelector(`.${show}`)
      ?.setAttribute("style", "display: block;");
    document.querySelector(`.${hide}`)?.setAttribute("style", "display: none;");
  }

  createContainer() {
    const div: HTMLDivElement = document.createElement("div");
    div.setAttribute("class", "container");
    div.innerHTML = `
        <div class="upper_buttons">
          <button class="garage_btn btn_page">
            TO GARAGE
          </button>
          <button class="winners_btn btn_page">
            TO WINNERS
          </button>
        </div>
          <div class="wrapper">
           <div class="garage_page">
            <div class="inputs_container">
              <div class="create_block block">
                <input type="text" class="create_input input_huge">
                </input>
                <input type="color" class="color_input input_small">
                </input>
                <button class="create_btn btn_input">
                  CREATE
                </button>
              </div>
              <div class="update_block block">
                <input type="text" class="update_input input_huge">
                </input>
                <input type="color" class="update_color_input input_small">
                </input>
                <button class="update_btn btn_input">
                  UPDATE
                </button>
              </div>
              <div class="buttons_block">
                <button class="garage_btn btn_page">
                  RACE
                </button>
                <button class="garage_btn btn_page">
                  RESET
                </button>
                <button class="garage_btn btn_generate">
                  GENERATE CARS
                </button>
              </div>
            </div>
            <div class="garage_header">
              <h2>Garage</h2>
              <p>Page</p>
            </div>
            <div class="garage_cars"></div>
            <div class="garage_buttons">
              <button class="garage_btn-prev btn-prev-next">PREV</button>
              <button class="garage_btn-next btn-prev-next">NEXT</button>
            </div>
          </div>
          </div>
          </div>
          <div class="winners_page" style="display: none;">
            <div class="winners_header">
              <h2>Winners</h2>
              <p>Page</p>
            </div>
            <div class="winners_result"></div>
            <div class="winners_buttons">
              <button class="winners_btn-prev btn-prev-next">PREV</button>
              <button class="winners_btn-next btn-prev-next">NEXT</button>
            </div>
          </div>`;

    document.body.appendChild(div);
  }

  createCar(name: string, color: string, id: number) {
    const div = document.createElement("div");
    div.setAttribute("class", "wrapper-car");
    div.setAttribute("id", `car-${id}`);
    div.setAttribute("dataName", `${name}`);
    div.innerHTML = `
        <div class="car_buttons">
            <button id="select-${id}" class="car_btn select ${id}">SELECT</button>
            <button id="remove-${id}" class="car_btn remove ${id}">REMOVE</button>
        </div>
        <div class="road">
            <div>
                <div class="btn-engine btn-A">A</div>
                <div class="btn-engine btn-B">B</div>
            </div>
            <img  id="${color}" class="car" src="" style="">
            <img class="finish" src="" >
        </div>
    `;
    (document.querySelector(".garage_cars") as HTMLElement).appendChild(div);
  }
}
