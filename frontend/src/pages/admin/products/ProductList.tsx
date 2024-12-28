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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 5;

  async function getProducts() {
    let url = `http://localhost:4000/products?_sort=id&_order=desc&_page=${currentPage}&_limit=${pageSize}&q=${search}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        let totalCount = Number(response.headers.get('X-Total-Count'));
        let pages = Math.ceil(totalCount / pageSize);
        setTotalPages(pages);
        setProducts(data);
      }
    } catch (error) {
      alert('Unable to fetch data');
    }
  }

  useEffect(() => {
    getProducts();
  }, [currentPage, search]);

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'DELETE',
      });
      if (response) {
        getProducts();
      }
    } catch (error) {
      alert('Unable to delete the product');
    }
  };

  //pagination buttons
  let paginationButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        className={i === currentPage ? 'page-item active' : '"page-item'}
        key={i}
      >
        <a
          className="page-link"
          href={`?page=${i}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(Number(i));
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //@ts-ignore
    let text = event.target.search.value;
    setSearch(text);
    setCurrentPage(1);
  };

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
        <div className="col">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              name="search"
              type="text"
              className="form-control me-2"
              placeholder="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
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
                  className="btn btn-primary btn-sm me-1"
                  to={`/admin/products/edit/${product.id}`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">{paginationButtons}</ul>
    </div>
  );
};

export default ProductList;
