import { NavLink } from "react-router-dom";

function getUserName() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.username || "Store Admin";
    
}

const Sidebar = ({ onLogout }) => {
    const userName = getUserName();

    return (
        <aside className="sidebar">
            <div className="sidebar__brand">
                <h1 className="sidebar__title">Retail Store</h1>
                <p className="sidebar__subtitle">Admin Panel</p>
            </div>

            <div className="sidebar__profile">
                <p className="sidebar__profile-name">{userName}</p>
            </div>

            <nav className="sidebar__nav" aria-label="Primary">
                <p className="sidebar__section-title">Management</p>

                <NavLink
                    to="/Dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar__link sidebar__link--active"
                            : "sidebar__link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar__link sidebar__link--active"
                            : "sidebar__link"
                    }
                >
                    Products
                </NavLink>
            </nav>

            <div className="sidebar__footer">
                <button
                    type="button"
                    className="sidebar__logout"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
