export const URL = "http://localhost:8000/api" // URL de l'API
export const API_URL = URL + "/api/"

export const PUBLIC_URL = process.env.PUBLIC_URL || '';
export function asset_url(path) {
    return PUBLIC_URL + path;
}
