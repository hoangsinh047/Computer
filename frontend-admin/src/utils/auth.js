import { STORAGE_KEYS } from './constants';

export function getToken() {
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function setToken(token) {
  localStorage.setItem(STORAGE_KEYS.token, token);
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEYS.token);
}

function base64UrlDecode(input) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
}

export function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    return JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return null;
  }
}

export function isTokenExpired(payload) {
  if (!payload?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}

export function getRolesFromPayload(payload) {
  if (!payload) return [];
  const roles = [];

  if (typeof payload.role === 'string') roles.push(payload.role);
  if (Array.isArray(payload.roles)) roles.push(...payload.roles.filter((x) => typeof x === 'string'));
  if (Array.isArray(payload.authorities)) roles.push(...payload.authorities.filter((x) => typeof x === 'string'));

  // Một số backend map role ở scope (vd: "ROLE_ADMIN")
  if (typeof payload.scope === 'string') roles.push(...payload.scope.split(' '));
  if (Array.isArray(payload.scopes)) roles.push(...payload.scopes.filter((x) => typeof x === 'string'));

  return Array.from(new Set(roles));
}

export function hasRole(roles, required) {
  return roles.includes(required) || roles.includes(required.replace('ROLE_', ''));
}
