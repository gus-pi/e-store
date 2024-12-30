const ProductDetails = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={`http/localhost/4000/images/url`}
            alt="product image"
            className="img-fluid mb-3"
            width={250}
          />
        </div>
        <div className="col-md-8">
          <h3 className="mb-3">Nokia</h3>
          <h3 className="mb-3">$Price</h3>
          <button type="button" className="btn btn-warning btn-sm">
            Add to Cart <i className="bi bi-cart4"></i>
          </button>

          <hr />
          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Brand</div>
            <div className="col-sm-9">Nokia</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Category</div>
            <div className="col-sm-9">Phones</div>
          </div>
          <div className="fw-bold">Description</div>
          <div>Description</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
