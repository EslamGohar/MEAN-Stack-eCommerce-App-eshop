import { Category } from "../models/category";

export class Product {
    id?: string;
    name?: string;
    image?: string;
    images?: string[];
    description?: string;
    richDescription?: string;
    brand?: string;
    price?: number;
    category?: Category;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}