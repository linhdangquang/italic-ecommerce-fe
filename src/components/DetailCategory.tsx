import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryDetails } from '../features/Categories/categorySlice.js';

function DetailCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category, loading, status } = useSelector(
    (state: any) => state.category
  );
  console.log(category);
  useEffect(() => {
    dispatch(getCategoryDetails(id));
  }, [dispatch, id]);
  return <div>DetailCategory</div>;
}

export default DetailCategory;
