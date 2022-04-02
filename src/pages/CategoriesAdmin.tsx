import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoriesList from '../components/CategoriesList';

function CategoriesAdmin() {
  return (
    <div
      style={{ height: 735, width: '100%', minWidth: 650 }}
      className="my-4  px-4  pb-12"
    >
      <div style={{ display: 'flex', height: '100%' }} className="  pt-4">
        <div style={{ flexGrow: 1 }}>
          <div className="flex justify-between">
            <h1 className="p-2 text-center text-3xl font-bold text-gray-800 antialiased">
              Categories
            </h1>
            <Link to="/admin/categories/add">
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
          <CategoriesList />
        </div>
      </div>
    </div>
  );
}

export default CategoriesAdmin;
