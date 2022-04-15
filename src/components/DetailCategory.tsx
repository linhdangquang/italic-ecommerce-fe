import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import dayjs from 'dayjs';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { USDFormat } from '../utils/currencyFormat';

import { getCategoryDetails } from '../features/Categories/categorySlice.js';

function DetailCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params: any) => USDFormat(params.value),
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
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 150,
      valueFormatter: (params: any) => {
        return dayjs(params.value).format('HH:mm DD/MM/YYYY ');
      },
    },
    {
      field: '_id',
      width: 350,
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
        </div>
      ),
    },
  ];
  const [pageSize, setPageSize] = React.useState<number>(10);

  const { category, loading, status } = useSelector(
    (state: any) => state.category
  );
  const rows = category?.category?.products?.map((product: any, idx) => {
    return {
      ...product,
      id: idx + 1,
    };
  });
  useEffect(() => {
    dispatch(getCategoryDetails(id));
  }, [dispatch, status, id]);
  return (
    <div
      style={{ height: 735, width: '100%', minWidth: 650 }}
      className="my-4  px-4  pb-12"
    >
      <div style={{ display: 'flex', height: '100%' }} className="  pt-4">
        <div style={{ flexGrow: 1 }}>
          <div className="flex justify-between">
            <h1 className="p-2 text-center text-3xl font-bold text-gray-800 antialiased">
              {category?.category?.name} :{' '}
              <small className="font-base text-gray-600">
                {category?.category?.products.length} products total
              </small>
            </h1>
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

export default DetailCategory;
