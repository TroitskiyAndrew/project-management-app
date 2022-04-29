export interface ILogin {
  login: string,
  password: string,
}

export interface ILoginFull extends ILogin {
  name: string,
}

export interface IUserNewParams extends ILoginFull {
  newPassword?: string,
}

export type UserFace = {
  name: string,
  login: string,
};

export type LoginResponse = {
  token: string
};
