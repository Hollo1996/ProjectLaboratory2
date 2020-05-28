
export interface UserDto {
    id: string;
    displayName: string;
    email: string;
    password: string;
    staySignedIn: boolean;
    lastToken: string;
}