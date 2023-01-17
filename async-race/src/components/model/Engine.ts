export default class Engine {

  async startStopEngine(
    id: number,
    status: string
  ): Promise<{ velocity: number; distance: number }> {
    const response = await fetch(
    `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
    {
      method: "PATCH",
    }
    );
  
    const result: {
    velocity: number;
    distance: number;
    } = await response.json();
  
    if (response.ok) {
    console.log(`Engine is ${status}: with status ${response.status}`);
    } else {
    if (response.status === 400) {
      console.log(`Error: ${response.status}. Wrong parameters: "id" should be any positive number,
      "status" should be "started", "stopped" or "drive"`);
    }
    if (response.status === 404) {
      console.log(
      `Error: ${response.status}. Car with such id was not found in the garage.`
      );
    }
    console.log(`Error HTTP: ${response.status}`);
    }
    return result;
  }
  
  async switchCarEngineToDrive(id: number, status: string): Promise<{success: boolean}>{
    const response = await fetch(
    `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
    {
      method: "PATCH",
    }
    );
  
    if (response.status === 500) {
    console.log("Engine is broken");
    throw new Error(`${response.status}`);
    }
  
    const result: {success: boolean} = await response.json();
    return result;
  }
  }