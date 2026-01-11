import { Button, Card, Form, Input, Modal, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { categoryApi } from '../../api/category.api';
import { confirmDelete } from '../../components/common/ConfirmDelete';

export default function CategoryList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      setData(await categoryApi.list());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <Card
      title={<Typography.Text strong>Danh mục</Typography.Text>}
      extra={
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Thêm danh mục
        </Button>
      }
    >
      <Table
        rowKey={(r) => String(r.id ?? r.name)}
        loading={loading}
        dataSource={data}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Code', dataIndex: 'code', width: 160 },
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
                        await categoryApi.remove(row.id);
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
        title={editing ? 'Sửa danh mục' : 'Thêm danh mục'}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            if (editing?.id) await categoryApi.update(editing.id, values);
            else await categoryApi.create(values);
            setOpen(false);
            await fetchData();
          }}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="code" label="Code">
            <Input placeholder="CPU / RAM / ..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
