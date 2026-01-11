import { Card, Table, Typography } from 'antd';

export default function StockManagement() {
  return (
    <Card title={<Typography.Text strong>Quản lý tồn kho</Typography.Text>}>
      <Table
        columns={[
          { title: 'SKU', dataIndex: 'sku', width: 180 },
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Tồn kho', dataIndex: 'stockQuantity', width: 120 },
        ]}
        pagination={false}
      />
    </Card>
  );
}
