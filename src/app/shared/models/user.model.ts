export interface IUser {
  id: string,
  name: string,
  login: string,
}

export interface IStateUser extends IUser {
  password: string;
}
