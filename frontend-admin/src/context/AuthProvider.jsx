import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { clearToken, decodeJwt, getRolesFromPayload, getToken, hasRole, isTokenExpired, setToken } from '../utils/auth';
import { AuthContext } from './AuthContextValue';

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const bootstrap = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const payload = decodeJwt(token);
    if (isTokenExpired(payload)) {
      clearToken();
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const me = await authApi.me();
      setUser({
        id: me.id,
        username: me.username ?? payload?.sub ?? 'admin',
        roles: me.roles ?? getRolesFromPayload(payload),
      });
    } catch {
      setUser({
        username: payload?.sub ?? 'admin',
        roles: getRolesFromPayload(payload),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    message.info('Bạn đã đăng xuất');
    navigate('/login', { replace: true });
  }, [navigate]);

  const login = useCallback(
    async (username, password) => {
      setLoading(true);
      try {
        const res = await authApi.login({ username, password });
        setToken(res.accessToken);
        await bootstrap();
        message.success('Đăng nhập thành công');
        navigate('/admin', { replace: true });
      } catch (e) {
        clearToken();
        setUser(null);
        message.error('Đăng nhập thất bại');
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [bootstrap, navigate]
  );

  const roles = user?.roles ?? [];
  const isAdmin = hasRole(roles, 'ROLE_ADMIN');

  const value = useMemo(
    () => ({
      loading,
      isAuthenticated: !!getToken() && !!user,
      isAdmin,
      user,
      login,
      logout,
    }),
    [isAdmin, loading, login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
