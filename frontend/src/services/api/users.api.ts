/**
 * User API service
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants';
import type {
    User,
    UserRegisterRequest,
    UserRegisterResponse,
    UserLoginRequest,
    UserLoginResponse,
} from '../../types/user';

export const usersApi = {
    /**
     * Register a new user
     */
    register: async (data: UserRegisterRequest): Promise<UserRegisterResponse> => {
        return apiClient.post<UserRegisterResponse>(API_ENDPOINTS.REGISTER, data);
    },

    /**
     * Login user
     */
    login: async (data: UserLoginRequest): Promise<UserLoginResponse> => {
        return apiClient.post<UserLoginResponse>(API_ENDPOINTS.LOGIN, data);
    },

    /**
     * Get all users
     */
    getAll: async (): Promise<User[]> => {
        return apiClient.get<User[]>(API_ENDPOINTS.USERS);
    },

    /**
     * Get user by ID
     */
    getById: async (id: number): Promise<User> => {
        return apiClient.get<User>(API_ENDPOINTS.USER_BY_ID(id));
    },

    /**
     * Get current user profile
     */
    getProfile: async (): Promise<User> => {
        return apiClient.get<User>(API_ENDPOINTS.USER_PROFILE);
    },

    /**
     * Update user
     */
    update: async (id: number, data: Partial<UserRegisterRequest>): Promise<User> => {
        return apiClient.put<User>(API_ENDPOINTS.USER_BY_ID(id), data);
    },

    /**
     * Delete user
     */
    delete: async (id: number): Promise<User> => {
        return apiClient.delete<User>(API_ENDPOINTS.USER_BY_ID(id));
    },
};
