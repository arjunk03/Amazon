/**
 * User-related type definitions
 */

export interface User {
    id: number;
    username: string;
    email: string;
    name?: string; // For backward compatibility
    phone?: string | null;
    user_type?: string | null;

}

export interface UserRegisterRequest {
    username: string;
    email: string;
    password: string;
    phone?: string | null;
    user_type?: string | null;
}

export interface UserRegisterResponse {
    id: number;
    username: string;
    email: string;
    phone?: string | null;
    user_type?: string | null;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    token: string;
    user: User;
    expiresAt?: string;
}
