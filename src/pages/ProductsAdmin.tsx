import React from 'react';
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
import { ProductType } from '../types';

type Props = {
  products: ProductType[];
  onRemove: (id: string) => void;
};

function ProductsAdmin({ products, onRemove }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerClassName: 'bg-sky-400 text-white',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 500,
      headerClassName: 'bg-sky-400 text-white',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      headerClassName: 'bg-sky-400 text-white',
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      headerClassName: 'bg-sky-400 text-white',
      renderCell: (params: GridValueGetterParams) => (
        <img src={params.value} alt={params.value} />
      ),
    },
    {
      field: '_id',
      width: 250,
      headerName: 'Actions',
      headerClassName: 'bg-sky-400 text-white',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Link to={`/admin/products/${params.value}/edit`}>
            <Button
              variant="contained"
              color="info"
              style={{ marginRight: '.75rem' }}
              startIcon={<EditIcon />}
              size="small"
            >
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => {
              onRemove(params.value);
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
  const rows: ProductType[] = products.map((product, idx) => ({
    ...product,
    id: idx + 1,
  }));

  const [pageSize, setPageSize] = React.useState<number>(10);
  return (
    <div
      style={{ height: 720, width: '100%', minWidth: 650 }}
      className="my-4 rounded-md px-4  pb-12"
    >
      <div style={{ display: 'flex', height: '100%' }}>
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
          <DataGrid
            className="mx-2 "
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            classes={{
              root: 'bg-sky-100',
              main: 'bg-sky-200',
              sortIcon: 'text-white',
              overlay: 'bg-gray-100',
              columnHeaderTitle: '!font-semibold',
            }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              boxShadow: '2',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsAdmin;
