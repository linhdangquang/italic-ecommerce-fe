import React, { useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import dayjs from 'dayjs';

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ProductType } from '../types';
import {
  fetchProducts,
  deleteProduct,
} from '../features/products/productsSlice.js';
import { USDFormat } from '../utils/currencyFormat';

function ProductsAdmin() {
  useEffect(() => {
    document.title = 'Products';
  });
  const dispatch = useDispatch();
  const delProduct = (id: string) => {
    const deleteSwal = withReactContent(Swal);
    deleteSwal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            dispatch(deleteProduct(id));
            deleteSwal.fire('Deleted!', 'Product has been deleted.', 'success');
          } catch (error) {
            deleteSwal.fire(
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
      field: 'id',
      headerName: 'ID',
      width: 100,
      cellClassName: 'font-semibold',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params: any) => {
        return USDFormat(params.value);
      },
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params: GridValueGetterParams) => (
        <img src={params.value} alt={params.value} />
      ),
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 75,
      cellClassName: 'text-center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 75,
      valueFormatter: (params: any) => {
        return params.value === 0 ? 'Active' : 'Inactive';
      },
      cellClassName: (params: any) => {
        return params.value === 0 ? 'active-product' : 'inactive-product';
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 135,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format('HH:mm DD/MM/YYYY ');
      },
    },
    {
      field: '_id',
      width: 300,
      headerName: 'Actions',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Link to={`/products/${params.value}`}>
            <Button
              variant="contained"
              style={{ marginRight: '.75rem' }}
              startIcon={<VisibilityIcon />}
              size="small"
              className="bg-orangeLight"
            >
              View
            </Button>
          </Link>
          <Link to={`/admin/products/${params.value}/edit`}>
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
            onClick={() => {
              delProduct(params.value);
            }}
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
  const { products, loading, status } = useSelector(
    (state: any) => state.products
  );
  const rows: ProductType[] = products?.map((product, idx) => ({
    ...product,
    id: idx + 1,
  }));

  const [pageSize, setPageSize] = React.useState<number>(10);
  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  return (
    <div
      style={{ height: 735, width: '100%', minWidth: 650 }}
      className="my-4  px-4  pb-12"
    >
      <div style={{ display: 'flex', height: '100%' }} className="  pt-4">
        <div style={{ flexGrow: 1 }}>
          <div className="flex justify-between">
            <h1 className="p-2 text-center text-3xl font-bold text-gray-800 antialiased">
              Products
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

export default ProductsAdmin;
