import api from "../utils/api";

export interface LoginValues{
    email: string;
    password: string;
    latitude: string;
    longitude: string;
    device: string;
  }

export interface LoginResponse{
    token: string;
    userName: string;
}


const authServises = {
    login: async (values: LoginValues): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/auth/login", values)
        return response.data;
    }
}

export default authServises;