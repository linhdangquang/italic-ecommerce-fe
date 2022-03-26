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
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 500,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
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
      field: '_id',
      width: 250,
      headerName: 'Actions',
      renderCell: (params: GridValueGetterParams) => (
        <div>
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
              toolbarContainer: 'gap-1 hover:bg-gray-100',
            }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            components={{
              Toolbar: GridToolbar,
            }}
            // sx={{
            //   boxShadow: '2',
            // }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsAdmin;
