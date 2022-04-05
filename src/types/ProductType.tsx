interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  status: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
export default Product;
