import { User } from "./user.interface";

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}