export const REGISTER_USER = {
    fullName: {
        type: 'string',
        required: true,
    },
    dateOfBirth: {
        type: 'date',
        required: true,
    },
    email: {
        type: 'email',
    },
    pinCode: {
        type: 'string',
        length: 6,
        required: true,
    },
};

export const MAKE_AN_ORDER = {
    userId: {
        type: 'number',
        required: true,
    },
    productId: {
        type: 'number',
        required: true,
    },
    quantity: {
        type: 'number',
        required: true,
    }
};
