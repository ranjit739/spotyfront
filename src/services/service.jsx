import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { API_ENDPOINTS } from "../endpoint/apiendpoint";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Axios instance for customization (e.g., adding headers)
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token to every request dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login Service
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
    toast.success('Login successful!');
    return response.data;
  } catch (error) {
    console.error("Backend Error:", error.response?.data);
    toast.error(error.response?.data.error || 'An unexpected error occurred');
    throw error.response?.data.error || "An unexpected error occurred"; 
  }
};

// Create Playlist Service
export const createPlaylist = async (credentials) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.PLAYLISTS, credentials);
    toast.success('Playlist created successfully!');
    return response.data;
  } catch (error) {
    console.error("Backend Error:", error.response?.data);
    toast.error(error.response?.data.error || 'Playlist creation failed');
    throw error.response?.data.error || "An unexpected error occurred";
  }
};

// Signup Service
export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.SIGNUP, userData);
    toast.success('Signup successful!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data.error || error.message);
    throw error.response?.data.error || error.message;
  }
};

// Get Playlist Service
export const getPlaylist = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PLAYLISTS);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data.error || 'Failed to fetch playlists');
    throw error.response?.data.error || error.message;
  }
};

// Delete Playlist Service
export const deletePlaylist = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.PLAYLISTS}/${id}`);
    toast.success('Playlist deleted successfully!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data.error || 'Failed to delete playlist');
    throw error.response?.data.error || error.message;
  }
};

// Update Playlist Service
export const updatePlaylist = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.PLAYLISTS}/${id}`, data);
    toast.success('Playlist updated successfully!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data.error || 'Failed to update playlist');
    throw error.response?.data.error || error.message;
  }
};

// Add Song to Playlist Service
export const addSongToPlaylist = async (playlistId, track) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINTS.PLAYLISTS}/${playlistId}/songs`, {
      songId: track.id,
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      album: track.album.name,
      duration: track.duration_ms / 1000, // Convert duration from milliseconds to seconds
    });
    toast.success(response?.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add song to playlist');
    throw error.response?.data?.message || error.message || 'Failed to add song to playlist';
  }
};
