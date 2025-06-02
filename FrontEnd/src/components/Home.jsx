import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Products from './Products';

function Home() {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
        
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-center items-center gap-8 max-w-screen-xl mx-auto">

                    
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-semibold underline"
                                : "text-gray-700 hover:text-blue-600"
                        }
                    >
                        Products
                    </NavLink>

                    
                    <button
                        type="button"
                        onClick={Logout}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Logout
                    </button>

                </div>
            </nav>
        </header>
        <Products/>
        </>
    );
}

export default Home;
