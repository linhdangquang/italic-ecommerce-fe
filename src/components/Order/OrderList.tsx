import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BeatLoader } from 'react-spinners';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { USDFormat } from '../../utils/currencyFormat';
import { fetchOrders } from '../../features/Order/orderSlice.js';

function OrderList() {
  useEffect(() => {
    document.title = 'Orders';
  });
  const dispatch = useDispatch();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'address, city',
      headerName: 'Informations',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.address}, ${params.row.city}, ${params.row.phone}`;
      },
    },
    {
      field: 'productsQuantity',
      headerName: 'Quantity',
      width: 75,
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
      },
    },
    {
      field: 'createdAt',
      headerName: 'Create At',
      width: 150,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format('HH:mm DD/MM/YYYY ');
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 150,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format('HH:mm DD/MM/YYYY ');
      },
    },
    {
      field: '_id',
      width: 340,
      headerName: 'Actions',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Link to={`/admin/categories/${params.value}/view`}>
            <Button
              variant="contained"
              style={{ marginRight: '.75rem' }}
              startIcon={<VisibilityIcon />}
              size="small"
              className="bg-blueDark"
            >
              Detail
            </Button>
          </Link>
          <Link to={`/admin/categories/${params.value}/edit`}>
            <Button
              variant="contained"
              style={{ marginRight: '.75rem' }}
              startIcon={<EditIcon />}
              size="small"
              className="bg-cyan-500"
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const { orders, loading } = useSelector((state: any) => state.order);
  const rows = orders.map((order, idx) => {
    return {
      ...order,
      productsQuantity: order.products
        .map((product) => product.quantity)
        .reduce((a, b) => a + b),
      total: USDFormat(order.total),
      id: idx + 1,
    };
  });
  const [pageSize, setPageSize] = React.useState<number>(10);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div
      style={{ height: 735, width: '100%', minWidth: 650 }}
      className="my-4  px-4  pb-12"
    >
      <div style={{ display: 'flex', height: '100%' }} className="  pt-4">
        <div style={{ flexGrow: 1 }}>
          <div className="flex justify-between">
            <h1 className="p-2 text-center text-3xl font-bold text-gray-800 antialiased">
              Orders
            </h1>
            <Link to="/admin/products/add">
              <Button
                variant="contained"
                color="success"
                style={{ marginRight: '.75rem' }}
                startIcon={<AddBoxIcon />}
              >
                Add
              </Button>
            </Link>
          </div>
          {!loading && (
            <DataGrid
              className="mx-2 rounded-lg shadow-md drop-shadow-lg"
              rows={rows}
              columns={columns}
              pageSize={pageSize}
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
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 20, 50, 100]}
              components={{
                Toolbar: GridToolbar,
              }}
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
          )}
          {loading && (
            <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
              <BeatLoader size={20} color="#34d399" margin={2} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
