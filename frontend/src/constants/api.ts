/**
 * API endpoints and configuration constants
 */

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/users/',
    LOGOUT: '/auth/logout',

    // Users
    USERS: '/users/',
    USER_BY_ID: (id: number) => `/users/${id}`,
    USER_PROFILE: '/users/me',

    // Products (for future use)
    PRODUCTS: '/products/',
    PRODUCT_BY_ID: (id: number) => `/products/${id}`,
    PRODUCT_CATEGORIES: '/products/categories',

    // Orders (for future use)
    ORDERS: '/orders/',
    ORDER_BY_ID: (id: number) => `/orders/${id}`,
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const REQUEST_TIMEOUT = 30000; // 30 seconds
