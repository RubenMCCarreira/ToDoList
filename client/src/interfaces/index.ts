export interface IHistory {
  push: Function;
  goBack: Function;
}

export interface IMatch {
  path: string;
}

export interface IItemState {
  value: null | string;
  error: boolean;
}
