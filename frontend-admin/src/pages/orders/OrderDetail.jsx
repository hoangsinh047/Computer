import { Button, Card, Descriptions, Select, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { orderApi } from '../../api/order.api';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const fetchDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      setOrder(await orderApi.getById(id));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Card
      loading={loading}
      title={<Typography.Text strong>Chi tiết đơn hàng</Typography.Text>}
      extra={
        <Button onClick={() => navigate(-1)} type="default">
          Quay lại
        </Button>
      }
    >
      {order && (
        <>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Mã">{order.code ?? order.id}</Descriptions.Item>
            <Descriptions.Item label="Khách hàng">{order.customerName}</Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">{order.totalAmount?.toLocaleString('vi-VN')} ₫</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Space>
                <span>{order.status}</span>
                <Select
                  size="small"
                  style={{ width: 160 }}
                  value={order.status}
                  onChange={async (v) => {
                    if (!order.id) return;
                    const updated = await orderApi.updateStatus(order.id, v);
                    setOrder(updated);
                  }}
                  options={[
                    { value: 'PENDING', label: 'PENDING' },
                    { value: 'CONFIRMED', label: 'CONFIRMED' },
                    { value: 'SHIPPING', label: 'SHIPPING' },
                    { value: 'COMPLETED', label: 'COMPLETED' },
                    { value: 'CANCELLED', label: 'CANCELLED' },
                  ]}
                />
              </Space>
            </Descriptions.Item>
          </Descriptions>

          <Typography.Title level={5} style={{ marginTop: 16 }}>
            Items
          </Typography.Title>
          <Table
            rowKey={(r) => String(r.id ?? r.productId)}
            dataSource={order.items ?? []}
            pagination={false}
            columns={[
              { title: 'Sản phẩm', dataIndex: 'productName' },
              { title: 'SKU', dataIndex: 'sku', width: 180 },
              { title: 'SL', dataIndex: 'quantity', width: 80 },
              { title: 'Giá', dataIndex: 'price', width: 120, render: (v) => v?.toLocaleString('vi-VN') },
            ]}
          />
        </>
      )}
    </Card>
  );
}
