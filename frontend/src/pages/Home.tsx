import ProductItem from '../components/ProductItem';

const Home = () => {
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
              <select className="form-select">
                <option value="">All Brands</option>
                <option value="Samsung">Samsung</option>
                <option value="Apple">Apple</option>
                <option value="Nokia">Nokia</option>
                <option value="HP">HP</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select">
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
              <select className="form-select">
                <option value="0">Order By Newest</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="row mb-5 g-3">
            <div className="col-md-3 col-sm-6">
              <ProductItem
                product={{
                  id: 1,
                  name: 'MSI Pulse Pro',
                  brand: 'MSI',
                  category: 'Computers',
                  price: 1099,
                  description:
                    'MSI Pulse GL66 15.6" FHD 144Hz Gaming Laptop: Intel Core i7-12700H RTX 3070 16GB 512GB NVMe SSD',
                  imageFilename: '22866337.jpg',
                  createdAt: '2023-07-13T17:46:54.8900000',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
