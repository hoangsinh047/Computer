import { Card, Table, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { userApi } from '../../api/user.api';

export default function AccountList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const res = await userApi.list();
      // backend may return { content: [...], totalElements } or plain array
      const list = Array.isArray(res) ? res : res?.content ?? [];
      setData(list);
    } catch (err) {
      console.error('Failed to load accounts', err);
      message.error('Không thể tải dữ liệu tài khoản');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title={<Typography.Text strong>Tài khoản</Typography.Text>}>
      <Table
        rowKey={(r) => String(r.id ?? r.username)}
        dataSource={data}
        loading={loading}
        columns={[
          { title: 'Username', dataIndex: 'username', width: 160 },
          { title: 'Họ tên', dataIndex: 'fullName' },
          { title: 'Email', dataIndex: 'email', width: 220 },
          { title: 'SĐT', dataIndex: 'phone', width: 150 },
          {
            title: 'Vai trò',
            dataIndex: 'roles',
            width: 150,
            render: (_, record) => {
              // backend might return roles as array of strings or objects or a single role field
              if (Array.isArray(record.roles)) {
                return record.roles.map((r) => (typeof r === 'string' ? r : r?.name ?? r)).join(', ');
              }
              if (record.role) return record.role;
              return '-';
            },
          },
        ]}
      />
    </Card>
  );
}
