import { Request, Response, Router } from 'express';
import { RouteHandler } from '@types';

class RouteBuilder {
    private router: Router;
    readonly baseUrl: string;
    readonly commonMiddleware: RouteHandler[];

    constructor ({ router, baseUrl, commonMiddleware }: { router: Router, baseUrl: string, commonMiddleware?: RouteHandler[] }) {
        this.router = router;
        this.commonMiddleware = commonMiddleware || [];
        this.baseUrl = baseUrl;
    }

    // TODO check type definition for here
    post <T>({ url, handler, middleware = [] }: { url: string, handler: (data: T | any) => object, middleware?: RouteHandler[] }) {
        this.router.post(
            `/${this.baseUrl}/${url}`,
            [...this.commonMiddleware, ...middleware],
            async (request: Request, response: Response) => {
                const result = await handler({
                    body: request.body,
                    params: request.params,
                    headers: request.headers,
                });

                response.send(result);
            }
        );

        return this;
    }

    // TODO check type definition for here
    get <T>({ url, handler, middleware = [] }: { url: string, handler: (data: T | any) => object, middleware?: RouteHandler[] }) {
        this.router.get(
            `/${this.baseUrl}/${url}`,
            [...this.commonMiddleware, ...middleware],
            async (request: Request, response: Response) => {
                const result = await handler({
                    params: request.params,
                    headers: request.headers,
                });

                response.send(result);
            }
        );

        return this;
    }
}

export default RouteBuilder;
