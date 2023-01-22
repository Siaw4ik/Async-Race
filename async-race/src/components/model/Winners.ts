import { Winner, State } from "../types";

export default class Winners {
  async getWinner(id: number): Promise<Winner> {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "GET",
    });
    if (response.status === 404) {
      console.log(`No such info about Winner - ${id}`);
      throw new Error("Error 404");
    }
    if (response.status === 200) {
      console.log(`Winner is ${id}`);
    }
    const result: Winner = await response.json();

    return result;
  }

  async deleteWinner(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "DELETE",
    });
    if (response.status === 404) {
      console.log(`No such Winner - ${id} in WinnersTable!`);
    }
    if (response.status === 200) {
      console.log(`Winner - ${id} was successfully deleted!`);
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
    if (response.status === 500) {
      console.log(
        `Error: Insert failed, duplicate id. Winner-${carId} already added`
      );
    }
    if (response.status === 201) {
      console.log(`Winner is: ${carId}`);
    }
    const result: Winner = await response.json();

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
      console.log(`No such Winner - ${carId} in WinnersTable!`);
    }
    if (response.status === 200) {
      console.log(`Winner - ${carId} was updated!`);
    }
    const result: Winner = await response.json();

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
      console.log(`Result added to the WinnersTable!`);
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

    const result: Winner[] = await response.json();

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

    const result: Winner[] = await response.json();

    return result;
  }
}
