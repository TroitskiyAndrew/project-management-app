export interface ILogin {
  login: string,
  password: string,
}

export interface ILoginFull extends ILogin {
  name: string,
}

export type LoginResponse = {
  token: string
};
