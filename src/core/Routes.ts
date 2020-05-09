import express, { Router as RouterType } from 'express';
import * as Routes from '@routes/index'
import { RouteKeys } from '@types';

const Router:RouterType = express.Router();

let routeName: RouteKeys;
//@ts-ignore
for (routeName in Routes) {
    Routes[routeName](Router);
}

export default Router;
