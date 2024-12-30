import { Link } from 'react-router-dom';
import { ProductData } from '../types';

const ProductItem = ({ product }: { product: ProductData }) => {
  return (
    <div className="rounded border shadow p-4 text-center h-100">
      <img
        src={`http://localhost:4000/images/${product.imageFilename}`}
        alt="product"
        className="img-fluid"
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <hr />
      <h4 className="py-2">{product.name}</h4>
      <p>
        Brand: {product.brand} <br />
        Category: {product.category} <br />
        {product.description.substr(0, 50) + '...'}
      </p>
      <h4 className="nb-2">${product.price}</h4>
      <Link
        to={`/products/${product.id}`}
        className="btn btn-primary btn-sm"
        role="button"
      >
        Details
      </Link>
    </div>
  );
};

export default ProductItem;
