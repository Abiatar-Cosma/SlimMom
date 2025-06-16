import instance from "./axiosInstance";
import {
  refreshUserToken,
  handleLogout,
} from "../../redux/auth/auth-operations";

// Exportăm o funcție, nu rulăm cod la import!
export const setupAxiosInterceptors = (store) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await store.dispatch(refreshUserToken());
          return instance(originalRequest);
        } catch (refreshError) {
          store.dispatch(handleLogout());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default instance; // exportăm și instanța, la nevoie
