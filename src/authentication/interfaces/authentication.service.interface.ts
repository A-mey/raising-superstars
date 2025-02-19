export interface AuthenticationServiceInterface {
    getToken(bearerToken: string): string;
    authenticateToken(token: string): Promise<string>;
    getUserId(token: string): string;
    checkWhetherUserExists(userId: string): Promise<void>;
}
