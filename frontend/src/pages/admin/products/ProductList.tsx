import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: 1199;
  description: string;
  imageFilename: string;
  createdAt: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    try {
      const response = await fetch(
        'http://localhost:4000/products?_sort=id&_order=desc'
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      alert('Unable to fetch data');
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/admin/products/create">
            Create Product
          </Link>
          <button
            onClick={getProducts}
            type="button"
            className="btn btn-outline-primary"
          >
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <img
                  src={`http://localhost:4000/images/${product.imageFilename}`}
                  alt="product"
                  width="100"
                />
              </td>
              <td>{product.createdAt.slice(0, 10)}</td>
              <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                <Link
                  className="btn bt-primary btn-sm me-1"
                  to={`/admin/products/edit/${product.id}`}
                >
                  Edit
                </Link>
                <button type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
