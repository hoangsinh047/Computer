import { Card, Input, Select, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../../api/order.api';

export default function OrderList() {
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(undefined);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await orderApi.list({ page, size, q: q || undefined, status });
      setData(res.content);
      setTotal(res.totalElements);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, status]);

  return (
    <Card title={<Typography.Text strong>Đơn hàng</Typography.Text>}>
      <Space style={{ marginBottom: 12 }} wrap>
        <Input.Search
          placeholder="Tìm theo mã đơn / khách hàng"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onSearch={() => {
            setPage(0);
            void fetchData();
          }}
          allowClear
          style={{ width: 280 }}
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          value={status}
          onChange={(v) => {
            setPage(0);
            setStatus(v);
          }}
          style={{ width: 240 }}
          options={[
            { value: 'PENDING', label: 'PENDING' },
            { value: 'CONFIRMED', label: 'CONFIRMED' },
            { value: 'SHIPPING', label: 'SHIPPING' },
            { value: 'COMPLETED', label: 'COMPLETED' },
            { value: 'CANCELLED', label: 'CANCELLED' },
          ]}
        />
      </Space>

      <Table
        rowKey={(r) => String(r.id ?? r.code)}
        loading={loading}
        dataSource={data}
        columns={[
          {
            title: 'Mã',
            dataIndex: 'code',
            width: 160,
            render: (v, row) => <Link to={`/admin/orders/${row.id}`}>{v ?? row.id}</Link>,
          },
          { title: 'Khách hàng', dataIndex: 'customerName' },
          { title: 'Trạng thái', dataIndex: 'status', width: 140 },
          { title: 'Tổng tiền', dataIndex: 'totalAmount', width: 140, render: (v) => v?.toLocaleString('vi-VN') },
          { title: 'Ngày tạo', dataIndex: 'createdAt', width: 180 },
        ]}
        pagination={{
          current: page + 1,
          pageSize: size,
          total,
          showSizeChanger: true,
          onChange: (p, s) => {
            setPage(p - 1);
            setSize(s);
          },
        }}
      />
    </Card>
  );
}

