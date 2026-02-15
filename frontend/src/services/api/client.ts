/**
 * Base HTTP client with interceptors and error handling
 */

import { env } from '../../config/env';
import { REQUEST_TIMEOUT } from '../../constants';
import { storage, STORAGE_KEYS } from '../../utils';

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export interface RequestConfig extends RequestInit {
    timeout?: number;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const { timeout = REQUEST_TIMEOUT, ...fetchConfig } = config;

        const url = `${this.baseURL}${endpoint}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
        const headers: HeadersInit = {
            ...fetchConfig.headers,
        };

        if (token) {
            (headers as any)['Authorization'] = `Bearer ${token}`;
        }

        if (!(fetchConfig.body instanceof FormData)) {
            (headers as any)['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(url, {
                ...fetchConfig,
                signal: controller.signal,
                headers,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorData: unknown;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = await response.text();
                }

                throw new ApiError(
                    (Array.isArray((errorData as { detail?: any })?.detail)
                        ? (errorData as { detail?: any[] }).detail?.map(d => d.msg).join(', ')
                        : (errorData as { detail?: string })?.detail) ||
                    (errorData as { message?: string })?.message ||
                    `Request failed with status ${response.status}`,
                    response.status,
                    errorData
                );
            }

            // Handle empty responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return {} as T;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new ApiError('Request timeout');
                }
                throw new ApiError(error.message);
            }

            throw new ApiError('An unknown error occurred');
        }
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    async post<T>(
        endpoint: string,
        data?: unknown,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: data
                ? (data instanceof FormData ? data : JSON.stringify(data))
                : undefined,
        });
    }

    async put<T>(
        endpoint: string,
        data?: unknown,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: data
                ? (data instanceof FormData ? data : JSON.stringify(data))
                : undefined,
        });
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }

    async patch<T>(
        endpoint: string,
        data?: unknown,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PATCH',
            body: data
                ? (data instanceof FormData ? data : JSON.stringify(data))
                : undefined,
        });
    }
}

export const apiClient = new ApiClient(env.apiBaseUrl);
