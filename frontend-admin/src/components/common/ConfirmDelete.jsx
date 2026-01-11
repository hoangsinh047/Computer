import { Modal } from 'antd';

export function confirmDelete(options) {
  Modal.confirm({
    title: options.title ?? 'Xoá mục này?',
    content: options.content ?? 'Hành động này không thể hoàn tác.',
    okText: 'Xoá',
    okButtonProps: { danger: true },
    cancelText: 'Huỷ',
    onOk: options.onOk,
  });
}
