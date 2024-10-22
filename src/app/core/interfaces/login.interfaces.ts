export interface CuentaInterface {
  name: string;
  lastname: string;
  email: string;
  profilePicture: string;
  token: string;
  role: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponseInterface {
  token: string;
}
