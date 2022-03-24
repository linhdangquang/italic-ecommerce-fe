import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
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
    },
    { field: 'name', headerName: 'Name', width: 500 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params: GridValueGetterParams) => (
        <img src={params.value} alt={params.value} />
      ),
    },
    {
      field: '_id',
      width: 200,
      headerName: 'Actions',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Link to={`/admin/products/${params.value}/edit`}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: '.75rem' }}
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
  const rows = products.map((product, idx) => ({ ...product, id: idx + 1 }));
  return (
    <div
      style={{ height: 600, width: '100%' }}
      className="shadow-md shadow-slate-100 drop-shadow-lg"
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[]}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsAdmin;
