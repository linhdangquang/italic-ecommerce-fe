import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BeatLoader } from 'react-spinners';
import { fetchCategories } from '../features/Categories/categoriesSlice.js';
import { CategoryType } from '../types/index';

function CategoriesList() {
  const dispatch = useDispatch();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 200,
    },
    {
      field: '_id',
      width: 350,
      headerName: 'Actions',
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Link to={`/admin/categories/${params.value}/view`}>
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
            // onClick={() => {
            //   delProduct(params.value);
            // }}
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
  const { categories, loading, status } = useSelector(
    (state: any) => state.categories
  );
  const rows: CategoryType[] = categories?.map(
    (category: CategoryType, idx) => {
      return {
        ...category,
        id: idx + 1,
      };
    }
  );
  const [pageSize, setPageSize] = React.useState<number>(10);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);
  return (
    <>
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
    </>
  );
}

export default CategoriesList;
