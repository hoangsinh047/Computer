import { Button, Card, Input, Select, Space, Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { productApi } from '../../api/product.api';
import { confirmDelete } from '../../components/common/ConfirmDelete';

export default function ProductList() {
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
      const res = await productApi.list({ page, size, q: q || undefined, status });
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

  const columns = useMemo(
    () => [
      { title: 'Tên', dataIndex: 'name', ellipsis: true },
      { title: 'SKU', dataIndex: 'sku', width: 160 },
      { title: 'Danh mục', dataIndex: 'categoryName', width: 160 },
      { title: 'Brand', dataIndex: 'brandName', width: 140 },
      { title: 'Giá', dataIndex: 'price', width: 120, render: (v) => v?.toLocaleString('vi-VN') },
      { title: 'Tồn', dataIndex: 'stockQuantity', width: 80 },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 130,
        render: (v) => {
          const color = v === 'ACTIVE' ? 'blue' : v === 'OUT_OF_STOCK' ? 'orange' : 'default';
          return <Tag color={color}>{v}</Tag>;
        },
      },
      {
        title: 'Hành động',
        key: 'actions',
        width: 200,
        render: (_, row) => (
          <Space>
            <Link to={`/admin/products/${row.id}/edit`}>Sửa</Link>
            <Button
              type="link"
              danger
              onClick={() =>
                confirmDelete({
                  onOk: async () => {
                    if (!row.id) return;
                    await productApi.remove(row.id);
                    await fetchData();
                  },
                })
              }
            >
              Xoá
            </Button>
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Card
      title={<Typography.Text strong>Quản lý sản phẩm</Typography.Text>}
      extra={
        <Button type="primary">
          <Link to="/admin/products/create">Tạo sản phẩm</Link>
        </Button>
      }
    >
      <Space style={{ marginBottom: 12 }} wrap>
        <Input.Search
          placeholder="Tìm theo tên / SKU"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onSearch={() => {
            setPage(0);
            void fetchData();
          }}
          allowClear
          style={{ width: 260 }}
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          value={status}
          onChange={(v) => {
            setPage(0);
            setStatus(v);
          }}
          style={{ width: 200 }}
          options={[
            { value: 'ACTIVE', label: 'ACTIVE' },
            { value: 'OUT_OF_STOCK', label: 'OUT_OF_STOCK' },
            { value: 'HIDDEN', label: 'HIDDEN' },
          ]}
        />
      </Space>

      <Table
        rowKey={(r) => String(r.id ?? r.sku)}
        loading={loading}
        dataSource={data}
        columns={columns}
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

