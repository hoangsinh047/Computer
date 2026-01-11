import { Button, Card, Form, Input, Modal, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { brandApi } from '../../api/brand.api';
import { confirmDelete } from '../../components/common/ConfirmDelete';

export default function BrandList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      setData(await brandApi.list());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <Card
      title={<Typography.Text strong>Thương hiệu</Typography.Text>}
      extra={
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Thêm thương hiệu
        </Button>
      }
    >
      <Table
        rowKey={(r) => String(r.id ?? r.name)}
        loading={loading}
        dataSource={data}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Slug', dataIndex: 'slug', width: 180 },
          {
            title: 'Hành động',
            width: 180,
            render: (_, row) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => {
                    setEditing(row);
                    form.setFieldsValue(row);
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() =>
                    confirmDelete({
                      onOk: async () => {
                        if (!row.id) return;
                        await brandApi.remove(row.id);
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
        ]}
      />

      <Modal
        open={open}
        title={editing ? 'Sửa thương hiệu' : 'Thêm thương hiệu'}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            if (editing?.id) await brandApi.update(editing.id, values);
            else await brandApi.create(values);
            setOpen(false);
            await fetchData();
          }}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input placeholder="Intel / AMD / ASUS ..." />
          </Form.Item>
          <Form.Item name="slug" label="Slug">
            <Input placeholder="intel" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
