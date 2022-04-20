import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import BeatLoader from 'react-spinners/BeatLoader';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getOrderByUserId } from '../../api/order';
import { USDFormat } from '../../utils/currencyFormat';
import { updateOrder } from '../../features/Order/ordersSlice.js';

function UserOrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const userId = user?.user?._id;
  const [userOrders, setUserOrders] = useState<any>([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const cancelOrder = async (orderId) => {
    const cancelSwal = withReactContent(Swal);
    cancelSwal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, i want to revert this!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            dispatch(
              updateOrder({
                _id: orderId,
                status: 'cancelled',
              })
            );
            navigate(`/orders/${orderId}`);
            cancelSwal.fire(
              'Cancelled',
              'Order has been  cancelled',
              'success'
            );
          } catch (error) {
            cancelSwal.fire(
              'Error!',
              'Something went wrong, please try again.',
              'error'
            );
          }
        }
      });
  };
  const confirmReceived = async (orderId) => {
    const confirmSwal = withReactContent(Swal);
    confirmSwal
      .fire({
        title: 'Confirm received?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I has been received',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            dispatch(
              updateOrder({
                _id: orderId,
                status: 'completed',
              })
            );
            navigate('/orders');
            confirmSwal.fire(
              'Confirmed',
              'Order has been confirmed',
              'success'
            );
          } catch (error) {
            confirmSwal.fire(
              'Error!',
              'Something went wrong, please try again.',
              'error'
            );
          }
        }
      });
  };
  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: 'ID',
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
          <Link to={`${params.value}`}>
            <Button
              size="small"
              variant="text"
              className="font-bold"
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          </Link>
          {params.row.status === 'pending' && (
            <Button
              size="small"
              variant="text"
              color="error"
              className="font-bold"
              onClick={() => cancelOrder(params.value)}
              startIcon={<CancelIcon />}
            >
              <p>Cancel</p>
            </Button>
          )}
          {params.row.status === 'delivery' && (
            <Button
              size="small"
              variant="text"
              className="font-bold text-emerald-600 hover:bg-emerald-100"
              color="info"
              onClick={() => confirmReceived(params.value)}
              startIcon={<CheckIcon />}
            >
              <p>Received</p>
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
      setIsLoading(false);
      setUserOrders(data?.userOrders);
    };
    fetchOrdersUser(userId);
  }, [userId, dispatch]);
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
  useEffect(() => {
    document.title = 'Orders';
  }, []);
  return (
    <div className="px-20 py-4">
      <h1 className="text-2xl font-bold">Your orders</h1>
      <div className="flex flex-col  justify-center">
        {userOrders?.length === 0 ? (
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
              {isLoading === false ? (
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
              ) : (
                <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
                  <BeatLoader size={20} color="#34d399" margin={2} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrderList;
