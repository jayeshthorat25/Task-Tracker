import api from "../api/api";

export const getAccessToken = async () => {
    const response = await api.post("/auth/refresh", {});
    const accessToken = response.data;
    return accessToken;
};
