export interface AuthState {
  roles: string[];
  permissions: string[];
}

export const initialAuthState: AuthState = {
  roles: [],
  permissions: [],
};
