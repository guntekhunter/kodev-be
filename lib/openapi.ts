export const openapiSpec = {
    openapi: "3.0.0",
    info: {
        title: "BE KOMUNITAS IT",
        description: "api komunitas it ke database supabase",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    paths: {
        "/api/auth/signup": {
            post: {
                tags: ["Auth"],
                summary: "Register new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "test@mail.com",
                                    },
                                    password: {
                                        type: "string",
                                        example: "Password123!",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "User registered successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Validation error",
                    },
                },
            },
        },

        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "test@mail.com",
                                    },
                                    password: {
                                        type: "string",
                                        example: "Password123!",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string" },
                                        user: { type: "object" },
                                        session: { type: "object" },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Invalid credentials",
                    },
                },
            },
        },
    },
};
