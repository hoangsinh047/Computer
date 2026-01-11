import { Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { authApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
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
      <Card style={{ width: 420, borderRadius: 16 }}>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          Đăng ký
        </Typography.Title>
        <Typography.Text type="secondary">Tạo tài khoản mới.</Typography.Text>

        <Form
          layout="vertical"
          style={{ marginTop: 16 }}
          onFinish={async (values) => {
            await authApi.register({
              username: values.username,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
            });
            navigate('/login', { replace: true });
          }}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Nhập username' }]}>
            <Input prefix={<UserOutlined />} placeholder="username" autoFocus />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="you@email.com" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Nhập password' }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="Nhập lại Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Nhập lại password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('Mật khẩu nhập lại không khớp'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="link" onClick={() => navigate('/login')}>Đã có tài khoản? Đăng nhập</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

