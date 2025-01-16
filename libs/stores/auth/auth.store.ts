import { LoginResponse } from "@/libs/interfaces/auth.interface";

export interface AuthState {
    loginResponse: LoginResponse | null;
  
    loginUser: (email: string, password: string, isChecked: boolean) => Promise<void>;
    logoutUser: () => void;
  }
  