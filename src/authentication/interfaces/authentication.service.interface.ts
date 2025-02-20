export interface AuthenticationServiceInterface {
    getToken(bearerToken: string): string;
    authenticateToken(token: string): Promise<number>;
    getUserId(token: string): number;
    checkWhetherUserExists(userId: number): Promise<void>;
}
