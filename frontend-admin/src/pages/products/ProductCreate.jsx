import { Button, Card, Form, Input, InputNumber, Select, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../../api/product.api';

export default function ProductCreate() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await productApi.create(values);
    navigate('/admin/products');
  };

  return (
    <Card title={<Typography.Text strong>Tạo sản phẩm</Typography.Text>}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          status: 'ACTIVE',
          discount: 0,
        }}
      >
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
