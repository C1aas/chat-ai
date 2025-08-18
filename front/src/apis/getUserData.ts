import type { User } from "../types/user"

// Fetches authenticated user's profile data from the server
export const getUserData = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_USERDATA_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    return userData as User;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};
