import { Router } from 'express';
import { CreateProductRequest, RouteFunction } from '@types';
import RouteBuilder from '@routes/RouteBuilder';
import { PayloadValidator } from '@plugins/index';
import { CREATE_PRODUCT } from '@validations';

const ProductRoute: RouteFunction = function (router: Router) {
    new RouteBuilder({ router: router, baseUrl: 'product' })
        .post({
            url: 'create',
            handler: async (request: CreateProductRequest) => {
                return {
                    status: true,
                    result: {},
                    message: 'The product is successfully created',
                };
            },
            middleware: [new PayloadValidator(CREATE_PRODUCT).createMiddleware()],
        });
};

export default ProductRoute;
