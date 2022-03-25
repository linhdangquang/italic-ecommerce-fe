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
      headerClassName: 'bg-slate-200',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 500,
      headerClassName: 'bg-slate-200',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      headerClassName: 'bg-slate-200',
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      headerClassName: 'bg-slate-200',
      renderCell: (params: GridValueGetterParams) => (
        <img src={params.value} alt={params.value} />
      ),
    },
    {
      field: '_id',
      width: 250,
      headerName: 'Actions',
      headerClassName: 'bg-slate-200',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Link to={`/admin/products/${params.value}/edit`}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: '.75rem' }}
              startIcon={<EditIcon />}
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
      className="my-4 rounded-md pb-12"
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <div className="flex justify-between">
            <h1 className="p-2 text-center text-xl font-bold text-gray-600">
              Products List
            </h1>
            <Link to="/admin/products/add">
              <Button
                variant="contained"
                color="primary"
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
