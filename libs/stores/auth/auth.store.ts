import { create } from "zustand";
import * as SecureStore from 'expo-secure-store';
import { LoginResponse } from "@/libs/interfaces/auth.interface";

interface AuthState {
    loginResponse: LoginResponse | null;
    getAuthLocal: () => Promise<void>;
    loginUser: (email: string, password: string, isChecked: boolean) => Promise<any>;
    logoutUser: () => void;
}
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const useAuthStore = create<AuthState>((set) => ({
    loginResponse: null,
    getAuthLocal: async () => {
        const auth = await SecureStore.getItemAsync('auth');
        if (auth) {
            set({
                loginResponse: JSON.parse(auth)
            });
        }
    },
    loginUser: async (email: string, password: string, isChecked: boolean): Promise<any> => {
        try
        {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            if (!response.ok) {
               return data || 'Login failed';
            }
            
            if(!data.errors){

                // Lưu token và user vào secure storage
                if(isChecked) {
                    await SecureStore.setItemAsync('auth', JSON.stringify(data));
                }
                set({
                    loginResponse: data
                });
            }
            return data;
        }
        catch (error) {
            return error || 'Login failed';
        }
    },
    logoutUser: async () => {
        await SecureStore.deleteItemAsync('auth');
        set({
            loginResponse: null
        });
    }
}));

export default useAuthStore;


