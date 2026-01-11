import { Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { authApi } from '../../api/auth.api';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tokenFromUrl = params.get('token') ?? '';

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
      <Card style={{ width: 460, borderRadius: 16 }}>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          Đặt lại mật khẩu
        </Typography.Title>
        <Typography.Text type="secondary">Dán token (lấy từ console backend) và nhập mật khẩu mới.</Typography.Text>

        <Form
          layout="vertical"
          style={{ marginTop: 16 }}
          initialValues={{ token: tokenFromUrl }}
          onFinish={async (values) => {
            await authApi.resetPassword({
              token: values.token,
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
            });
            navigate('/login', { replace: true });
          }}
        >
          <Form.Item label="Token" name="token" rules={[{ required: true, message: 'Nhập token' }]}>
            <Input prefix={<SafetyOutlined />} placeholder="token" autoFocus />
          </Form.Item>
          <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Nhập mật khẩu mới' }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Nhập lại mật khẩu mới' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                  return Promise.reject(new Error('Mật khẩu nhập lại không khớp'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="link" onClick={() => navigate('/login')}>Quay lại đăng nhập</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

