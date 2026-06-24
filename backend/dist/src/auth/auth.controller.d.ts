import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: import("@prisma/client").$Enums.Role;
            points: number;
        };
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: import("@prisma/client").$Enums.Role;
            points: number;
        };
    }>;
}
