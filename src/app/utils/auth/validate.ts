import { jwtDecode } from "jwt-decode";

interface RawDecodedToken {
    exp: number;
    username: string;
    email: string;
    roles: string[];
    organization: {
        id: string,
        name: string
    };
    id: string;
    [key: string]: any;
    permissions: string[]
}

interface ValidatedToken {
    token: string;
}

export function validateToken(): ValidatedToken | null {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<RawDecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) return null;

        return {
            token
        };
    } catch {
        return null;
    }
}
