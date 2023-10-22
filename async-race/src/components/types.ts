export type Car = {
  name: string;
  color: string;
  id: number;
};

export type State = {
  currentPage: number;
  totalCars: number;
  currentBoardPage: number;
  totalWinnersCars: number;
  sort: string;
  order: string;
  orderInner: string;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};
