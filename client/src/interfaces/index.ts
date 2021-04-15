export interface IHistory {
  push: Function;
  goBack: Function;
}

export interface IMatch {
  path: string;
}

export interface IState {
  value: null | string;
  error: boolean;
}
