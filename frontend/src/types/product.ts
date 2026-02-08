/**
 * Product-related type definitions
 */

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    seller_id: number;
}

export interface ProductCreateRequest {
    name: string;
    description: string;
    price: number;
    image: string;
    seller_id: number;
}
