import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getOrderByUserId } from '../../api/order';
import { USDFormat } from '../../utils/currencyFormat';

function UserOrderList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const userId = user?.user?._id;
  const [userOrders, setUserOrders] = useState<any>([{}]);
  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: 'ID ORDER',
      width: 220,
      cellClassName: 'order-id',
      valueFormatter: (params: any) => {
        return `#${params.value}`;
      },
    },
    {
      field: 'productsQuantity',
      headerName: 'Quantity',
      width: 100,
    },
    {
      field: 'total',
      headerName: 'Total Price',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'status-header',
      width: 100,
      valueFormatter: (params: any) => {
        if (params.value === 'pending') {
          return 'Pending';
        }
        if (params.value === 'delivery') {
          return 'Delivery';
        }
        if (params.value === 'completed') {
          return 'Completed';
        }
        if (params.value === 'cancelled') {
          return 'Cancelled';
        }
      },
      cellClassName: (params: any) => {
        if (params.value === 'pending') {
          return 'pending';
        }
        if (params.value === 'delivery') {
          return 'delivery';
        }
        if (params.value === 'completed') {
          return 'completed';
        }
        if (params.value === 'cancelled') {
          return 'cancelled';
        }
        return '';
      },
    },
    {
      field: 'createdAt',
      headerName: 'Create At',
      width: 150,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format('HH:mm DD/MM/YY ');
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 150,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format('HH:mm DD/MM/YY ');
      },
    },
    {
      field: 'idAction',
      width: 350,
      headerName: 'Actions',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Button size="small" variant="text" startIcon={<VisibilityIcon />}>
            <Link to={`/orders/${params.value}`}>View</Link>
          </Button>
          {params.row.status === 'pending' && (
            <Button size="small" variant="text" startIcon={<CancelIcon />}>
              <p>Cancel</p>
            </Button>
          )}
        </div>
      ),
    },
  ];
  const rows = userOrders.map((order, idx) => {
    return {
      ...order,
      productsQuantity: order?.products
        ?.map((product) => product.quantity)
        .reduce((a, b) => a + b),
      total: USDFormat(order.total),
      idAction: order._id,
      id: idx + 1,
    };
  });
  useEffect(() => {
    const fetchOrdersUser = async (id) => {
      const { data } = (await getOrderByUserId(id)) || {};
      setUserOrders(data?.userOrders);
    };
    fetchOrdersUser(userId);
  }, [userId]);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);
  useEffect(() => {
    if (user?.user?.role === 'admin') {
      toast.warning('Admin do not have orders');
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className="px-20 py-4">
      <h1 className="text-2xl font-bold">Your orders</h1>
      <div className="flex flex-col  justify-center">
        {userOrders.length === 0 ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="-translate-y-1/2 text-center">
              <h1 className="text-3xl font-bold">You don't have any orders</h1>
              <Link
                to="/products"
                className="text-lg font-semibold hover:text-blueDark"
              >
                Buy some products
              </Link>
            </div>
          </div>
        ) : (
          <div className="min-h-screen py-4">
            <div style={{ height: 500, width: '100%', minWidth: 650 }}>
              <DataGrid
                className="mx-2 rounded-lg shadow-md drop-shadow-lg"
                rows={rows}
                columns={columns}
                classes={{
                  root: 'bg-white',
                  row: 'hover:bg-gray-100 bg-white border border-gray-100',
                  sortIcon: 'text-gray-500',
                  overlay: 'bg-gray-100',
                  columnHeaders: 'border-gray-100',
                  columnHeaderTitle: 'font-bold text-gray-700',
                  menuIconButton: 'text-gray-600',
                  columnSeparator: 'hidden',
                  cell: 'text-gray-700',
                  footerContainer: 'border-t-0 text-gray-500',
                  toolbarContainer: 'gap-1',
                }}
                rowsPerPageOptions={[10, 20, 50, 100]}
                componentsProps={{
                  toolbar: {
                    sx: {
                      '& .MuiButton-root': {
                        fontWeight: 600,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrderList;
