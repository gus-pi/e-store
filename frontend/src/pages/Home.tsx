import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';
import { ProductData } from '../types';

const Home = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterParams, setFilterParams] = useState({ brand: '', category: '' });

  const [sortColumn, setSortColumn] = useState({
    column: 'id',
    orderBy: 'desc',
  });

  const pageSize = 8;

  async function getProducts() {
    let url = `http://localhost:4000/products?&_page=${currentPage}&_limit=${pageSize}`;

    if (filterParams.brand) {
      url = url + `&brand=${filterParams.brand}`;
    }
    if (filterParams.category) {
      url = url + `&category=${filterParams.category}`;
    }

    url = url + `&_sort=${sortColumn.column}&_order=${sortColumn.orderBy}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        let totalCount = Number(response.headers.get('X-Total-Count'));
        let pages = Math.ceil(totalCount / pageSize);
        setTotalPages(pages);
      }
    } catch (error) {
      alert('Unable to fetch data');
    }
  }

  useEffect(() => {
    getProducts();
  }, [currentPage, filterParams, sortColumn]);

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

  const handleBrandFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let brand = event.target.value;
    setFilterParams({ ...filterParams, brand: brand });
    setCurrentPage(1);
  };

  const handleCategoryFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let category = event.target.value;
    setFilterParams({ ...filterParams, category: category });
    setCurrentPage(1);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = Number(event.target.value);
    switch (value) {
      case 0:
        setSortColumn({ column: 'id', orderBy: 'desc' });
        break;
      case 1:
        setSortColumn({ column: 'price', orderBy: 'asc' });
        break;
      case 2:
        setSortColumn({ column: 'price', orderBy: 'desc' });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#08618d', minHeight: '200px' }}>
        <div className="container text-white py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h1 className="mb-5 display-2">
                <strong>Welcome to our shop!</strong>
              </h1>
              <p>
                Find a large selection of the newest electronic devices from the
                best brands.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/images/hero.png"
                alt="hero image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container py-5">
          <div className="row mb-5 g-2">
            <div className="col-md-6">
              <h4>Products</h4>
            </div>
            <div className="col-md-2">
              <select className="form-select" onChange={handleBrandFilter}>
                <option value="">All Brands</option>
                <option value="Samsung">Samsung</option>
                <option value="Apple">Apple</option>
                <option value="Nokia">Nokia</option>
                <option value="HP">HP</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" onChange={handleCategoryFilter}>
                <option value="">All Categories</option>
                <option value="Phones">Phones</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="Printers">Printers</option>
                <option value="Cameras">Cameras</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" onChange={handleSort}>
                <option value="0">Order By Newest</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="row mb-5 g-3">
            {products.map((product) => (
              <div className="col-md-3 col-sm-6 " key={product.id}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          <ul className="pagination">{paginationButtons}</ul>
        </div>
      </div>
    </>
  );
};

export default Home;
