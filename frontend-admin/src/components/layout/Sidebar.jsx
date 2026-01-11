import {Layout, Menu} from 'antd';
import {
    DashboardOutlined,
    ShoppingOutlined,
    TagsOutlined,
    TrademarkOutlined,
    ShoppingCartOutlined,
    InboxOutlined,
    UserOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import {APP_NAME} from '../../utils/constants';

const {Sider} = Layout;

const items = [
    {key: '/admin', icon: <DashboardOutlined/>, label: <Link to="/admin">Dashboard</Link>},
    {key: '/admin/products', icon: <ShoppingOutlined/>, label: <Link to="/admin/products">Sản phẩm</Link>},
    {key: '/admin/categories', icon: <TagsOutlined/>, label: <Link to="/admin/categories">Danh mục</Link>},
    {key: '/admin/brands', icon: <TrademarkOutlined/>, label: <Link to="/admin/brands">Thương hiệu</Link>},
    {key: '/admin/orders', icon: <ShoppingCartOutlined/>, label: <Link to="/admin/orders">Đơn hàng</Link>},
    {key: '/admin/inventory', icon: <InboxOutlined/>, label: <Link to="/admin/inventory">Tồn kho</Link>},
    {key: '/admin/users', icon: <UserOutlined/>, label: <Link to="/admin/users">Khách hàng</Link>},
    {key: '/admin/account', icon: <TeamOutlined/>, label: <Link to="/admin/account">Tài khoản</Link>}
];

export default function Sidebar() {
    const location = useLocation();
    const selectedKey = items
        .map((x) => x.key)
        .sort((a, b) => b.length - a.length)
        .find((k) => location.pathname === k || location.pathname.startsWith(`${k}/`));

    return (
        <Sider breakpoint="lg" collapsedWidth="0" theme="dark">
            <div style={{height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', color: '#fff'}}>
                <div style={{fontWeight: 700, lineHeight: 1.2}}>
                    {APP_NAME}
                    <div style={{fontSize: 12, fontWeight: 400, opacity: 0.75}}>Admin</div>
                </div>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={selectedKey ? [selectedKey] : []} items={items}/>
        </Sider>
    );
}
