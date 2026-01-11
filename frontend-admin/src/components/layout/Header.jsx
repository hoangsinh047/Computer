import { Button, Layout, Space, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Header } = Layout;

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <Header style={{ background: '#0b1220', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }} />
      <Space>
        <Typography.Text style={{ color: '#c7d2fe' }}>{user?.username ?? 'admin'}</Typography.Text>
        <Button icon={<LogoutOutlined />} onClick={logout}>
          Đăng xuất
        </Button>
      </Space>
    </Header>
  );
}

