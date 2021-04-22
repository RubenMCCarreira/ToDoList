export interface IToDo {
  id: number;
  title: string;
  description: string;
  removed: boolean;
  priority: number;
  done: boolean;
}

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
  value: string | null;
  error: boolean;
}

export interface IMessage {
  id: string;
  user: string;
  text: string;
  room: string;
}

export interface IRoom {
  id: number;
  name: string;
}

export interface IMapValues {
  ISO3: string;
  Name: string;
}

export interface ICoordinates {
  0: number;
  1: number;
}

export interface IImage extends Blob {
  name: string;
  src: string;
  legend?: string | null;
}

export interface ICountry {
  country: string;
  capital: string;
  coordinates: number[];
}

export interface IMapRoute {
  id: number;
  from: ICountry;
  departure: string;
  to: ICountry;
  arrive: string;
}

export interface IProfile {
  username: string;
  password: string;
  token: string;
}
