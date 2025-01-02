import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let email = e.currentTarget.email.value;
    let password = e.currentTarget.email.password;

    const navigate = useNavigate();

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    const credentials = { email, password };

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('server response: ', data);
        navigate('/');
      } else {
        alert('Unable to log in' + data);
      }
    } catch (error) {
      alert('Unable to connect to server');
    }
  };
  return (
    <div className="container my-4">
      <div className="mx-auto rounded border p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-5">Welcome, please log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" name="email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" />
          </div>

          <div className="row">
            <div className="col d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="col d-grid">
              <Link className="btn btn-outline-primary" to="/" role="button">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
