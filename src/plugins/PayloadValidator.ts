import { Request, Response } from 'express';
import { RouteHandler } from '@types';

interface ConfigInterface {
    type: string
    length?: number
    max?: number
    min?: number
    required?: boolean
}

class PayloadValidator {
    readonly validationConfig: object;
    private message: string;

    public constructor (validationConfig: object) {
        this.validationConfig = validationConfig;
    }

    public createMiddleware (): RouteHandler {
        return (request: Request, response: Response, next: () => void) => {
            if (this.isValidated(request.body)) {
                next();
            } else {
                response.send({
                    result: null,
                    status: false,
                    message: this.message
                });
            }
        }
    }

    private isValidated (payload: object): boolean {
        if (!this.isPayloadAsExpected(payload)) {
            this.message =`payload is not as expected.`;

            return false;
        }

        let validated = true;

        let key: string;
        for (key in this.validationConfig) {
            // @ts-ignore
            if (!PayloadValidator.validateByType(payload[key], this.validationConfig[key])) {
                this.message =`${key} validation error.`;
                validated = false;
                break;
            }
        }

        return validated;
    }

    /**
     * Checks payload`s properties are equal to payload validation config
     */
    private isPayloadAsExpected(payload: object): boolean {
        let validated = true;

        let key: string;
        for (key in payload) {
            // @ts-ignore
            if (!this.validationConfig[key]) {
                validated = false;
                break;
            }
        }

        return validated;
    }

    private static validateByType(value: any, validationConfig: ConfigInterface ): boolean {
        const { type } = validationConfig;

        if (validationConfig.required === false && typeof value === 'undefined') {
            return true;
        }

        switch (type) {
            case 'number':
                return PayloadValidator.isNumberValidationPassed(value, validationConfig);
            case 'string':
                return PayloadValidator.isStringValidationPassed(value, validationConfig);
            case 'boolean':
                return PayloadValidator.isBooleanValidationPassed(value);
            case 'email':
                return PayloadValidator.isEmailValidationPassed(value);
            case 'date':
                return PayloadValidator.isDateValidationPassed(value);
        }

        return true;
    }

    private static isNumberValidationPassed(value: any, options: ConfigInterface): boolean {
        return typeof value === 'number' &&
            !(options.max && value > options.max) &&
            !(options.min && value < options.min);
    }

    private static isStringValidationPassed(value: any, options: ConfigInterface): boolean {
        return typeof value === 'string' &&
            !(options.length && value.length !== options.length) &&
            !(options.max && value.length > options.max) &&
            !(options.min && value.length < options.min);
    }

    private static isEmailValidationPassed(value: any): boolean {
        return typeof value === 'string' && /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(value);
    }

    private static isBooleanValidationPassed(value: any): boolean {
        return typeof value === 'boolean';
    }

    private static isDateValidationPassed(value: any): boolean {
        const dateValidationRegex = /^\d{4}-\d{2}-\d{2}$/;

        if(!value.match(dateValidationRegex)) {
            return false;
        }

        const date = new Date(value);
        const dateAsNumber = date.getTime();

        if(!dateAsNumber && dateAsNumber !== 0) {
            return false;
        }

        return date.toISOString().slice(0,10) === value;
    }
}

export default PayloadValidator;
