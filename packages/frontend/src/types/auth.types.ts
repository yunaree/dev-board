export type User = {
    id: number;
    username: string;
    email: string | null;
    avatar: string | null;
};

export type AuthTokens = {
    access_token: string;
    refresh_token: string;
};

export type AuthResponse = AuthTokens;

export type AuthCredentials = {
    username: string;
    pass: string;
};

export type RefreshRequest = {
    refreshToken: string;
}; 