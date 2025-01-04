import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorType, ProductData } from '../../../types';
import { AppContext } from '../../../AppContext';

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;

  const [initialData, setInitialData] = useState<ProductData>();

  const [validationErrors, setValidationErrors] = useState<ErrorType>();

  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/products/${params.id}`
      );
      const data = await response.json();
      setInitialData(data);
    } catch (error) {
      alert('Unable to fetch product data');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const product = Object.fromEntries(formData.entries());
    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price ||
      !product.description
    ) {
      alert('Please fill all fields!');
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/products/${params.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + userCredentials?.accessToken,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        //Product created correctly!
        navigate('/admin/products');
      } else if (response.status === 400) {
        setValidationErrors(data);
      } else if (response.status === 401) {
        // disconnect the user
        setUserCredentials(null);
      } else {
        alert('Unable to update the product!');
      }
    } catch (error) {
      alert('Unable to connect to the server!');
    }
  };
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Product</h2>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">ID</label>
            <div className="col-sm-8">
              <input
                readOnly
                className="form-control-plaintext"
                defaultValue={params.id}
              />
            </div>
          </div>
          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="name"
                    defaultValue={initialData.name}
                  />
                  <span className="text-danger">{validationErrors?.name}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Brand</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="brand"
                    defaultValue={initialData.brand}
                  />
                  <span className="text-danger">{validationErrors?.brand}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Category</label>
                <div className="col-sm-8">
                  <select
                    className="form-select"
                    name="category"
                    defaultValue={initialData.category}
                  >
                    <option value="Other">Other</option>
                    <option value="Phones">Phones</option>
                    <option value="Computers">Computers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Printers">Printers</option>
                    <option value="Cameras">Cameras</option>
                  </select>
                  <span className="text-danger">
                    {validationErrors?.category}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Price $</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="price"
                    type="number"
                    step="0.01"
                    min="1"
                    defaultValue={initialData.price}
                  />
                  <span className="text-danger">{validationErrors?.price}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    name="description"
                    rows={4}
                    defaultValue={initialData.description}
                  />
                  <span className="text-danger">
                    {validationErrors?.description}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-8 offset-sm-4">
                  <img
                    src={`http://localhost:4000/images/${initialData.imageFilename}`}
                    alt="image"
                    width={150}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Image</label>
                <div className="col-sm-8">
                  <input className="form-control" type="file" name="image" />
                  <span className="text-danger">{validationErrors?.image}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Created at</label>
                <div className="col-sm-8">
                  <input
                    className="form-control-plaintext"
                    readOnly
                    defaultValue={initialData.createdAt.slice(0, 10)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <div className="col-sm-4 d-grid">
                  <Link
                    className="btn btn-secondary"
                    to="/admin/products"
                    role="button"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
