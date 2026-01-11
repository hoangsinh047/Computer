# Frontend Admin - Linh kiện & Phụ kiện máy tính

Tech stack:
- React + Vite + TypeScript
- Ant Design
- react-router-dom v6
- axios
- JWT auth (ROLE_ADMIN)
- State: React Context

## Run (Windows PowerShell)

```powershell
cd "D:\Nghich Ngom\MovieProject-main\Computer\frontend-admin"
npm install
npm run dev
```

## Config

`frontend-admin/.env.development`
- `VITE_API_BASE_URL` (default: `http://localhost:8080`)
- `VITE_TOKEN_STORAGE_KEY` (default: `admin_access_token`)

## Backend contract assumptions
- `POST /api/auth/login` body `{ username, password }` -> `{ accessToken }`
- `GET /api/auth/me` -> `{ id, username, roles }` (optional; app fallback decode token)

Nếu backend khác, chỉnh trong `src/utils/constants.ts`.

