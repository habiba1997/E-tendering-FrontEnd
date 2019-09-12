"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO(jannyHou): This should be moved to @loopback/authentication
exports.UserProfileSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
    },
};
// TODO(jannyHou): This is a workaround to manually
// describe the request body of 'Users/login'.
// We should either create a Credential model, or
// infer the spec from User model
const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
//# sourceMappingURL=user-controller.specs.js.map