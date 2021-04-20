export interface IHistory {
  push: Function;
  goBack: Function;
  location: {
    pathname: string;
  };
}

export interface IMatch {
  path: string;
}

export interface IItemState {
  value: null | string;
  error: boolean;
}

export interface ICoordinates {
  0: number;
  1: number;
}
