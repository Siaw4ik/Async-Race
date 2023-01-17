import Garage from "../model/Garage";

export default class PagesView {
  garage = new Garage();

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
        <div class="page-buttons">
          <button class="btn garage_btn btn_page">
            TO GARAGE
          </button>
          <button class="btn winners_btn btn_page">
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
                <button class="btn create_btn btn_input">
                  CREATE
                </button>
              </div>
              <div class="update_block block">
                <input type="text" class="update_input input_huge">
                </input>
                <input type="color" class="update_color_input input_small">
                </input>
                <button class="btn update_btn btn_input">
                  UPDATE
                </button>
              </div>
              <div class="buttons_block">
                <button class="btn down-input_btn btn_page">
                  RACE
                </button>
                <button class="btn down-input_btn btn_page">
                  RESET
                </button>
                <button class="btn down-input_btn btn_generate">
                  GENERATE CARS
                </button>
              </div>
            </div>
            <div class="garage_header">
              <h2 class="garage_h2">Garage</h2>
              <p class="garage_p">Page</p>
            </div>
            <div class="garage_main">
              <div class="garage_cars"></div>
              <div class="garage_buttons">
                <button class="btn garage_btn-prev btn-prev-next">PREV</button>
                <button class="btn garage_btn-next btn-prev-next">NEXT</button>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div class="winners_page" style="display: none;">
            <div class="winners_header">
              <h2 class="winners_header_h2">Winners</h2>
              <p class="winners_header_p">Page</p>
            </div>
            <table class="winners_result">
              <thead class"t_head">
                <tr>
                  <th class="th_number">Number</th>
                  <th class="th_car">Car View</th>
                  <th class="th_name">Car Name and Model</th>
                  <th class="th_wins">Wins</th>
                  <th class="th_time">Best time, s</th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr class="removable_row">
                  <td colspan="5">No statistic for a while</td>
                </tr>
              </tbody>
            </table>
            <div class="winners_buttons">
              <button class="btn winners_btn-prev btn-prev-next">PREV</button>
              <button class="btn winners_btn-next btn-prev-next">NEXT</button>
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
        <div class="wrapper_control-btn_name">
            <div class="car_buttons">
                <button id="select-${id}" class="btn car_btn select ${id}">SELECT</button>
                <button id="remove-${id}" class="btn car_btn remove ${id}">REMOVE</button>
            </div>
            <p class="car-name">${name}</p>
        </div>
        <div class="road">
            <div class="container_engine_btn">
                <div class="btn-engine A btn-A-${id}">A</div>
                <div class="btn-engine B btn-B-${id}">B</div>
            </div>
            <svg id="road_svg-car-${id}" class="car" width="200" height="66" viewBox="0 0 200 66" fill="${color}" xmlns="http://www.w3.org/2000/svg">
                <path d="M164.804 35.7532C161.848 35.7532 158.958 36.6298 156.5 38.2722C154.042 39.9146 152.127 42.2489 150.995 44.9801C149.864 47.7113 149.568 50.7166 150.145 53.616C150.721 56.5154 152.145 59.1786 154.235 61.269C156.326 63.3593 158.989 64.7829 161.888 65.3596C164.788 65.9363 167.793 65.6403 170.524 64.5091C173.255 63.3778 175.59 61.462 177.232 59.004C178.874 56.546 179.751 53.6562 179.751 50.7C179.746 46.7374 178.17 42.9386 175.368 40.1366C172.566 37.3346 168.767 35.7583 164.804 35.7532ZM164.804 62.5077C162.47 62.5077 160.188 61.8155 158.247 60.5186C156.306 59.2217 154.793 57.3785 153.9 55.2219C153.007 53.0652 152.773 50.6922 153.228 48.4027C153.684 46.1132 154.808 44.0102 156.458 42.3596C158.109 40.709 160.212 39.5848 162.501 39.1294C164.791 38.6739 167.164 38.9076 169.321 39.8009C171.477 40.6941 173.321 42.2068 174.618 44.1477C175.914 46.0885 176.607 48.3704 176.607 50.7047C176.607 52.2551 176.303 53.7903 175.71 55.2229C175.117 56.6554 174.248 57.9571 173.152 59.0537C172.056 60.1502 170.754 61.02 169.322 61.6134C167.89 62.2069 166.355 62.5123 164.804 62.5123V62.5077ZM168.581 50.7047C168.581 51.4517 168.36 52.182 167.945 52.8032C167.53 53.4244 166.94 53.9086 166.25 54.1945C165.56 54.4804 164.8 54.5553 164.068 54.4096C163.335 54.2639 162.662 53.9042 162.134 53.376C161.605 52.8478 161.246 52.1748 161.1 51.4421C160.954 50.7094 161.029 49.95 161.315 49.2598C161.601 48.5696 162.085 47.9797 162.706 47.5647C163.327 47.1496 164.057 46.9281 164.804 46.9281C165.806 46.9281 166.767 47.326 167.475 48.0342C168.183 48.7424 168.581 49.703 168.581 50.7047ZM55.5864 50.7047C55.5863 47.7485 54.7096 44.8588 53.0672 42.4008C51.4248 39.9429 49.0904 38.0272 46.3593 36.896C43.6281 35.7647 40.6229 35.4688 37.7235 36.0455C34.8241 36.6223 32.1609 38.0458 30.0706 40.1361C27.9803 42.2264 26.5567 44.8897 25.98 47.789C25.4032 50.6884 25.6992 53.6937 26.8304 56.4248C27.9617 59.156 29.8774 61.4903 32.3353 63.1327C34.7932 64.7752 37.683 65.6518 40.6391 65.6519C44.6019 65.647 48.4009 64.0706 51.203 61.2685C54.005 58.4664 55.5814 54.6674 55.5864 50.7047ZM40.6391 62.5077C38.3049 62.5076 36.023 61.8153 34.0822 60.5184C32.1413 59.2215 30.6286 57.3782 29.7354 55.2216C28.8421 53.0649 28.6084 50.6919 29.0638 48.4024C29.5192 46.113 30.6433 44.01 32.2939 42.3594C33.9445 40.7089 36.0475 39.5848 38.3369 39.1294C40.6263 38.6739 42.9994 38.9076 45.156 39.8009C47.3126 40.6941 49.1559 42.2068 50.4529 44.1477C51.7498 46.0886 52.442 48.3704 52.4421 50.7047C52.4428 52.2551 52.138 53.7904 51.5451 55.223C50.9523 56.6556 50.083 57.9573 48.9869 59.0538C47.8908 60.1503 46.5894 61.0201 45.1571 61.6136C43.7248 62.207 42.1895 62.5124 40.6391 62.5123V62.5077ZM187.64 53.2213C188.009 50.1039 187.736 46.9438 186.837 43.9361C185.938 40.9284 184.432 38.1368 182.412 35.7336C180.393 33.3304 177.902 31.3665 175.094 29.9632C172.286 28.5599 169.22 27.7468 166.085 27.5743C162.951 27.4017 159.814 27.8732 156.869 28.9598C153.924 30.0464 151.233 31.7249 148.961 33.8919C146.69 36.0588 144.887 38.6682 143.663 41.5591C142.439 44.4499 141.821 47.5609 141.846 50.7C141.842 54.1819 142.635 57.6184 144.163 60.7468H61.28C62.861 57.5035 63.6558 53.9333 63.6 50.3256C63.5442 46.7178 62.6394 43.174 60.9589 39.981C59.2784 36.7881 56.8694 34.036 53.9271 31.9475C50.9848 29.859 47.5919 28.4929 44.0233 27.96C40.4547 27.427 36.8108 27.7421 33.3866 28.8798C29.9625 30.0175 26.8545 31.9457 24.3144 34.5082C21.7743 37.0708 19.8736 40.1957 18.7661 43.6297C17.6586 47.0637 17.3756 50.7103 17.94 54.2741C7.03915 49.6941 0 42.2017 0 30.3519C0 18.077 36.966 0.81234 60.4774 0V14.5081C60.4774 17.3104 61.5906 19.9978 63.5721 21.9794C65.5536 23.9609 68.2411 25.074 71.0434 25.074H91.2634C93.7604 25.0703 96.1749 24.1803 98.0771 22.5627C99.9792 20.9451 101.245 18.7048 101.65 16.2409C101.65 16.2409 100.961 7.02043 98.7511 5.38213L100.201 4.30128L110.615 16.2502H150.66C177.891 16.2409 200 26.2162 200 38.4911C200 44.1566 195.331 49.2979 187.64 53.2213ZM44.4162 50.7C44.4162 51.447 44.1947 52.1773 43.7796 52.7984C43.3646 53.4195 42.7747 53.9036 42.0846 54.1895C41.3944 54.4754 40.635 54.5502 39.9023 54.4044C39.1696 54.2587 38.4966 53.899 37.9684 53.3708C37.4402 52.8425 37.0804 52.1695 36.9347 51.4369C36.789 50.7042 36.8638 49.9448 37.1496 49.2546C37.4355 48.5644 37.9196 47.9745 38.5407 47.5595C39.1619 47.1445 39.8921 46.923 40.6391 46.923C41.1355 46.923 41.6271 47.0208 42.0856 47.2109C42.5442 47.401 42.9608 47.6797 43.3116 48.0309C43.6624 48.3821 43.9405 48.7991 44.13 49.2578C44.3195 49.7166 44.4168 50.2083 44.4162 50.7047V50.7Z" fill=""/>
            </svg>
            <svg class="road_finish" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6666 91.6667H25H33.3333" fill="#FF612F"/>
                <path d="M16.6666 91.6667H25H33.3333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 91.6667V8.33333Z" fill="#FF612F"/>
                <path d="M25 91.6667V8.33333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M83.3333 12.5H25V45.8333H83.3333L75 29.1667L83.3333 12.5Z" fill="#FF612F" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    `;
    (document.querySelector(".garage_cars") as HTMLElement).appendChild(div);
  }
}
