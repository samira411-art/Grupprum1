// Adressen till json-server. Läses från .env (VITE_API_URL) så att den
// inte behöver skrivas ut (hårdkodas) i varje fil som gör ett fetch-anrop.
// Om ingen .env finns används localhost:3000 som standard.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
