import { Button, Card, Form, Input, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { authApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
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
          Quên mật khẩu
        </Typography.Title>
        <Typography.Text type="secondary">Nhập email để nhận token đặt lại mật khẩu (môi trường dev sẽ log token ra console backend).</Typography.Text>

        <Form
          layout="vertical"
          style={{ marginTop: 16 }}
          onFinish={async (values) => {
            await authApi.forgotPassword({ email: values.email });
            navigate('/login', { replace: true });
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="you@email.com" autoFocus />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Gửi yêu cầu
          </Button>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="link" onClick={() => navigate('/login')}>Quay lại đăng nhập</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

