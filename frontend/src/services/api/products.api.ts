/**
 * Products API service
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants';
import type { Product, ProductCreateRequest } from '../../types/product';

export const productsApi = {
    /**
     * Get all products
     */
    getAll: async (): Promise<Product[]> => {
        return apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS);
    },

    /**
     * Get product by ID
     */
    getById: async (id: number): Promise<Product> => {
        return apiClient.get<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id));
    },

    /**
     * Get product categories
     */
    getCategories: async (): Promise<string[]> => {
        return apiClient.get<string[]>(API_ENDPOINTS.PRODUCT_CATEGORIES);
    },

    /**
     * Create a new product
     */
    create: async (data: ProductCreateRequest): Promise<Product> => {
        return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS, data);
    },

    /**
     * Update product
     */
    update: async (id: number, data: Partial<ProductCreateRequest>): Promise<Product> => {
        return apiClient.put<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id), data);
    },

    /**
     * Delete product
     */
    delete: async (id: number): Promise<Product> => {
        return apiClient.delete<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id));
    },
};
