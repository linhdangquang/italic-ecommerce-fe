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
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BannerType } from '../../types/index';
import {
  fetchBanners,
  removeBanner,
} from '../../features/HeroBanner/bannerSlice.js';

function BannerList() {
  const dispatch = useDispatch();
  const delBanner = (id: string) => {
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
            dispatch(removeBanner(id));
            deleteSwal.fire('Deleted!', 'Banner has been deleted.', 'success');
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
      width: 50,
      cellClassName: 'font-semibold',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
    },
    {
      field: 'subtitle',
      headerName: 'Subtitle',
      width: 250,
    },
    {
      field: 'buttonText',
      headerName: 'Button Text',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 76,
      valueFormatter: (params: any) => {
        return params.value === 0 ? 'Active' : 'Inactive';
      },
      cellClassName: (params: any) => {
        return params.value === 0 ? 'active-product' : 'inactive-product';
      },
    },
    {
      field: 'imageUrl',
      headerName: 'Image',
      width: 150,
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
          <Link to={`/admin/banners/${params.value}/edit`}>
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
              delBanner(params.value);
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
  const { banner, loading, status } = useSelector((state: any) => state.banner);
  const rows: BannerType[] = banner?.map((banner: BannerType, idx) => {
    return {
      ...banner,
      id: idx + 1,
    };
  });
  const [pageSize, setPageSize] = React.useState<number>(10);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBanners());
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

export default BannerList;
