import { Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';

const mockLowStock = [
  { key: '1', name: 'CPU Intel Core i5', sku: 'CPU-I5-12400F', stockQuantity: 3, status: 'ACTIVE' },
  { key: '2', name: 'RAM Corsair 16GB', sku: 'RAM-COR-16G', stockQuantity: 5, status: 'ACTIVE' },
];

export default function Dashboard() {
  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Dashboard
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic title="Tổng sản phẩm" value={128} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic title="Tổng đơn hàng" value={56} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic title="Doanh thu" value={235000000} suffix="₫" />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic title="Sắp hết hàng" value={7} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="Sản phẩm sắp hết hàng">
        <Table
          rowKey="key"
          dataSource={mockLowStock}
          pagination={false}
          columns={[
            { title: 'Tên', dataIndex: 'name' },
            { title: 'SKU', dataIndex: 'sku' },
            { title: 'Tồn', dataIndex: 'stockQuantity' },
            {
              title: 'Trạng thái',
              dataIndex: 'status',
              render: (v) => <Tag color={v === 'ACTIVE' ? 'blue' : 'default'}>{v}</Tag>,
            },
          ]}
        />
      </Card>
    </div>
  );
}
