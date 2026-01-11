import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import ProductList from '../pages/products/ProductList';
import ProductCreate from '../pages/products/ProductCreate';
import ProductEdit from '../pages/products/ProductEdit';
import CategoryList from '../pages/categories/CategoryList';
import BrandList from '../pages/brands/BrandList';
import OrderList from '../pages/orders/OrderList';
import OrderDetail from '../pages/orders/OrderDetail';
import StockManagement from '../pages/inventory/StockManagement';
import CustomerList from '../pages/users/CustomerList';
import AccountList from '../pages/account/AccountList'

export const adminRoutes = [
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/admin',
                element: <AdminLayout/>,
                children: [
                    {index: true, element: <Dashboard/>},
                    {path: 'products', element: <ProductList/>},
                    {path: 'products/create', element: <ProductCreate/>},
                    {path: 'products/:id/edit', element: <ProductEdit/>},
                    {path: 'categories', element: <CategoryList/>},
                    {path: 'brands', element: <BrandList/>},
                    {path: 'orders', element: <OrderList/>},
                    {path: 'orders/:id', element: <OrderDetail/>},
                    {path: 'inventory', element: <StockManagement/>},
                    {path: 'users', element: <CustomerList/>},
                    {path: 'account', element: <AccountList/>}
                ],
            },
        ],
    },
];
