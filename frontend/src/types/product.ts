/**
 * Product-related type definitions
 */

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    seller_id: number;
}

export interface ProductCreateRequest {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    seller_id: number;
}
