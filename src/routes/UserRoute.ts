import { Router } from 'express';
import { MakeAnOrderRequest, RegisterUserRequest, RouteFunction } from '@types';
import RouteBuilder from '@routes/RouteBuilder';
import { PayloadValidator } from '@plugins/index';
import { MAKE_AN_ORDER, REGISTER_USER } from '@validations';

const UserRoute: RouteFunction = function (router: Router) {
    new RouteBuilder({ router: router, baseUrl: 'user' })
        .post({
            url: 'register',
            handler: async (request: RegisterUserRequest) => {
                return {
                    status: true,
                    result: {},
                    message: 'The user is successfully registered',
                };
            },
            middleware: [new PayloadValidator(REGISTER_USER).createMiddleware()],
        })
        .post({
            url: 'make-an-order',
            handler: async (request: MakeAnOrderRequest) => {
                return {
                    status: true,
                    result: {},
                    message: 'The order is successfully completed',
                }
            },
            middleware: [new PayloadValidator(MAKE_AN_ORDER).createMiddleware()],
        });
};

export default UserRoute;
