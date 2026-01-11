/* eslint-disable react-hooks/set-state-in-effect */
import { Button, Card, Form, Input, InputNumber, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../../api/product.api';

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);

    productApi
      .getById(id)
      .then((p) => {
        if (cancelled) return;
        form.setFieldsValue(p);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form, id]);

  const onFinish = async (values) => {
    if (!id) return;
    await productApi.update(id, values);
    navigate('/admin/products');
  };

  return (
    <Card title={<Typography.Text strong>Sửa sản phẩm</Typography.Text>} loading={loading}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Space wrap style={{ display: 'flex' }}>
          <Form.Item name="name" label="Tên" rules={[{ required: true }]} style={{ minWidth: 320, flex: 1 }}>
            <Input />
          </Form.Item>
          <Form.Item name="sku" label="SKU" rules={[{ required: true }]} style={{ minWidth: 220 }}>
            <Input />
          </Form.Item>
        </Space>

        <Space wrap style={{ display: 'flex' }}>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]} style={{ minWidth: 200 }}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="discount" label="Giảm giá" style={{ minWidth: 200 }}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="stockQuantity" label="Tồn kho" rules={[{ required: true }]} style={{ minWidth: 200 }}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="warrantyMonths" label="Bảo hành (tháng)" style={{ minWidth: 220 }}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]} style={{ minWidth: 220 }}>
            <Select
              options={[
                { value: 'ACTIVE', label: 'ACTIVE' },
                { value: 'OUT_OF_STOCK', label: 'OUT_OF_STOCK' },
                { value: 'HIDDEN', label: 'HIDDEN' },
              ]}
            />
          </Form.Item>
        </Space>

        <Space>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
          <Button onClick={() => navigate(-1)}>Huỷ</Button>
        </Space>
      </Form>
    </Card>
  );
}
