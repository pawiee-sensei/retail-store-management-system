import { Link } from 'react-router-dom';

function Header({ isAuthenticated = false, onLogout }) {
  return (
    <header className="app-header">
      <div>
        <Link to="/" className="app-header__logo">
          Retail Store
        </Link>
      </div>

      <nav className="app-header__nav">
        <Link to="/" className="app-header__link">
          Home
        </Link>

        {isAuthenticated ? (
        <button type="button" className="app-header__button" onClick={onLogout}>
            Logout
        </button>



        ) : (
          <>
            <Link to="/login" className="app-header__button">
              Login
            </Link>
            <Link to="/register" className="app-header__button">
              Register
            </Link>
          </>

        
        )}
      </nav>
    </header>
  );
}

export default Header;
