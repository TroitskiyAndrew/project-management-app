export interface ILogin {
  login: string,
  password: string,
}

export interface ISignUp extends ILogin {
  name: string,
}

export type LoginResponse = {
  token: string
};
