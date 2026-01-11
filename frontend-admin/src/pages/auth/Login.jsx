import { Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(80% 80% at 50% 20%, #1e293b 0%, #0b1220 60%, #070b13 100%)',
        padding: 16,
      }}
    >
      <Card style={{ width: 380, borderRadius: 16 }}>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          Admin Login
        </Typography.Title>
        <Typography.Text type="secondary">Đăng nhập để quản trị cửa hàng linh kiện.</Typography.Text>

        <Form
          layout="vertical"
          style={{ marginTop: 16 }}
          onFinish={async (values) => {
            await login(values.username, values.password);
          }}
        >
          <Form.Item label="Username / Email" name="username" rules={[{ required: true, message: 'Nhập username hoặc email' }]}>
            <Input prefix={<UserOutlined />} placeholder="admin" autoFocus />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Nhập password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="link" onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</Button>
            <Button type="link" onClick={() => navigate('/register')}>Đăng ký</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
