import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/api/auth";
import { toast } from "react-toastify";

export const handleRegistration = createAsyncThunk(
  "users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.signup(data);
      toast.success(`Registration is success.`);
      return result;
    } catch (error) {
      toast.error(`Sorry, registration failed. Try again.`);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Sorry, login failed. Check email and password. Try again."
      );
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔥 Eliminat refreshUserToken complet

export const handleLogout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.logout();
      return result;
    } catch (error) {
      toast.error(`Sorry, logout failed. Try again.`);
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/current",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCalorieIntake = createAsyncThunk(
  "daily-intake",
  async (payload, thunkAPI) => {
    try {
      const result = await api.getCalorieIntake(payload);
      return result;
    } catch (error) {
      toast.error(`Sorry, request failed.`);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getCalorieIntakeForUser = createAsyncThunk(
  "daily-intake/user",
  async (payload, thunkAPI) => {
    try {
      const result = await api.getCalorieIntakeForUser(payload);
      return result;
    } catch (error) {
      toast.error(`Sorry, request failed.`);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
