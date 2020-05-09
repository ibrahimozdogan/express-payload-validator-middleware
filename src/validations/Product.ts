export const CREATE_PRODUCT = {
    name: {
        type: 'string',
        max: 255,
        required: true,
    },
    price: {
        type: 'number',
        min: 5,
        required: true,
    },
};

