const TOKEN_KEY = 'jwt-token'

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
    return !!getToken()
}

export const parseJwt = (token: string): any => {
    try {
        const payload = token.split('.')[1]
        return JSON.parse(atob(payload))
    } catch {
        return null
    }
}

