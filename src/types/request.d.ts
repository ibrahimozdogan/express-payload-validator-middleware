import { Request, Response, Router } from 'express';

export type RouteKeys = 'UserRoute' | 'ProductRoute';

export type RouteFunction = (route: Router) => void;

export type RouteHandler = (request: Request, response: Response, next: () => void) => void;

export interface GeneralHeaders {
    'content-type': 'application/json',
    'accept-language': 'tr' | 'en',
}

export interface RegisterUserRequest {
    headers: GeneralHeaders
    body: {
        fullName: string
        dateOfBirth: string
        email: string
        pinCode: string
    }
}

export interface MakeAnOrderRequest {
    headers: GeneralHeaders
    body: {
        productId: number
        userId: number
        quantity: number
    }
}

export interface CreateProductRequest {
    headers: GeneralHeaders
    body: {
        name: string
        price: number
    }
}
