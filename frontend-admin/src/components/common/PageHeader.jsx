import { Space, Typography } from 'antd';

export default function PageHeader({ title, extra }) {
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 12 }} align="center">
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      {extra}
    </Space>
  );
}
