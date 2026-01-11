import { Card, Table, Typography } from 'antd';

// const mock = [
//   { id: 1, username: 'customer01', fullName: 'Nguyễn Văn A', email: 'a@example.com', phone: '0900000000' },
//   { id: 2, username: 'customer02', fullName: 'Trần Thị B', email: 'b@example.com', phone: '0911111111' },
// ];

export default function CustomerList() {
  return (
    <Card title={<Typography.Text strong>Khách hàng</Typography.Text>}>
      <Table
        rowKey={(r) => String(r.id ?? r.username)}
        // dataSource={mock}
        columns={[
          { title: 'Username', dataIndex: 'username', width: 160 },
          { title: 'Họ tên', dataIndex: 'fullName' },
          { title: 'Email', dataIndex: 'email', width: 220 },
          { title: 'SĐT', dataIndex: 'phone', width: 150 },
        ]}
      />
    </Card>
  );
}
