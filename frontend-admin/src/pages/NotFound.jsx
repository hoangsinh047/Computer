import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy trang"
      extra={
        <Button type="primary">
          <Link to="/admin">Về dashboard</Link>
        </Button>
      }
    />
  );
}

