import { Winner, State } from "../types";

export default class Winners {
  async getWinner(id: number): Promise<Winner> {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "GET",
    });
    if (response.status === 404) {
      console.log("No such info about specified Car");
      throw new Error("Error 404");
    }
    if (response.status === 200) {
      console.log(`Winner is: ${id}`);
    }
    const result = await response.json();

    return result;
  }

  async deleteWinner(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "DELETE",
    });
    if (response.status === 404) {
      console.log("There is no such car in garage!");
    }
    if (response.status === 200) {
      console.log(`Car wit id: ${id} was successfully deleted!`);
    }
  }

  async createWinner(
    carId: number,
    carWins: number,
    carTime: number
  ): Promise<Winner> {
    const response = await fetch(`http://127.0.0.1:3000/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: carId, wins: carWins, time: carTime }),
    });
    if (response.status === 404) {
      console.log("No such info about specified Car");
    }
    if (response.status === 201) {
      console.log(`Winner is: ${carId}`);
    }
    const result = await response.json();

    return result;
  }

  async updateWinner(
    carId: number,
    carWins: number,
    carTime: number
  ): Promise<Winner> {
    const response = await fetch(`http://127.0.0.1:3000/winners/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wins: carWins, time: carTime }),
    });
    if (response.status === 404) {
      console.log("No such info about specified Car!");
    }
    if (response.status === 200) {
      console.log(`Winner with id:${carId} has been updated successfully!`);
    }
    const result = await response.json();

    return result;
  }

  async getWinners(page: number = 1): Promise<Winner[]> {
    const response = await fetch(
      `http://127.0.0.1:3000/winners?_page=${page}&_limit=10`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      console.log(`Result successfully added to the score board!`);
      const header = response.headers;
      (document.querySelector(
        ".winners_header_h2"
      ) as HTMLElement).innerHTML = `Winners (${header.get("X-Total-Count")})`;

      const storage = localStorage.getItem("state");
      let state: State;

      if (typeof storage === "string" && storage.length > 0) {
        state = JSON.parse(storage);
        state.totalWinnersCars = Number(header.get("X-Total-Count"));
        localStorage.setItem("state", JSON.stringify(state));
      }
    }

    const result = response.json();

    return result;
  }

  async getSortedWinners(
    sort: string,
    order: string,
    page: number = 1
  ): Promise<Winner[]> {
    const response = await fetch(
      `http://127.0.0.1:3000/winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      console.log(`${sort} sorted successfully in ${order} order!`);
    }

    const result = response.json();

    return result;
  }
}
