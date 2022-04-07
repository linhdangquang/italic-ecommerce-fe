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
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchUsers } from '../features/Users/usersSlice.js';
import { UserType } from '../types';

function UsersList() {
  useEffect(() => {
    document.title = 'Users';
  });
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
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
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
  const { users, isLoading, status } = useSelector((state: any) => state.users);
  const rows: UserType[] = users?.map((user: UserType, idx: number) => ({
    ...user,
    id: idx + 1,
  }));
  const [pageSize, setPageSize] = React.useState<number>(10);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);
  return (
    <>
      {!isLoading && (
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
      {isLoading && (
        <div className=" absolute top-1/2 right-1/2 flex min-h-fit items-center justify-center">
          <BeatLoader size={20} color="#34d399" margin={2} />
        </div>
      )}
    </>
  );
}

export default UsersList;
