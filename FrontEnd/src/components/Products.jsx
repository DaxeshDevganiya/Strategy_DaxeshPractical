import React, { useEffect, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';



function Products() {
    
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  
 
  
  const [filters, setFilters] = useState({
    Product_Name: '',
    Category: '',
    Status: '',
    Product_Price: '',
    Product_Quantity: '',
  });

  
  const fetchProductData= async () => {
    try {
      const result = await fetch('http://localhost:3000/products/getProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });
      const data = await result.json();
      if (result.status === 200) {
        setProducts(data.product || []);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchProductData();
    const savedFilters = localStorage.getItem('productFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  useEffect(() => {
    setTimeout(() => {
        localStorage.setItem('productFilters', JSON.stringify(filters));
    }, 500);
  }, [filters]);

  
  useEffect(() => {
    let filtered = products;

    if (filters.Product_Name) {
      filtered = filtered.filter((pro) =>
        pro.Product_Name.toLowerCase().includes(filters.Product_Name.toLowerCase())
      );
    }
    if (filters.Category) {
      filtered = filtered.filter((pro) =>
        pro.Category.toLowerCase().includes(filters.Category.toLowerCase())
      );
    }
    if (filters.Status) {
      filtered = filtered.filter((pro) =>
        pro.Status.toLowerCase().includes(filters.Status.toLowerCase())
      );
    }
    if (filters.Product_Price) {
      filtered = filtered.filter((pro) =>
        pro.Product_Price.toString().includes(filters.Product_Price)
      );
    }
    if (filters.Product_Quantity) {
      filtered = filtered.filter((pro) =>
        pro.Product_Quantity.toString().includes(filters.Product_Quantity)
      );
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  
  

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.status === 200) {
        alert("Product deleted");
        setProducts((prev) => prev.filter((p) => p.productId !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
    setOpenMenu(null);
  };

  
  

  
  const filterCategories = [...new Set(products.map(p => p.Category))].filter(Boolean);
  const filterStatus = [...new Set(products.map(p => p.Status))].filter(Boolean);

  return (
    <div className="h-screen flex flex-col p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Product List</h2>
      <div className="flex justify-between items-center mb-4">
  <div>
  
  </div>
        <Link to="/addProduct">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
            Add Product
            </button>
        </Link>
        </div>

        

        
      <div className="flex-1 overflow-auto shadow-md rounded-lg bg-gray-50 border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="text-xs uppercase bg-gray-100 border-b border-gray-300">
            <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>

        
            <tr className="bg-white border-b border-gray-300">
            <th className="px-3 py-2">

</th>
              <th className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Filter by name"
                  value={filters.Product_Name}
                  onChange={(e) => handleFilterChange('Product_Name', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </th>
                <th className="px-3 py-2">

                </th>
              
              <th className="px-3 py-2">
                <select
                  value={filters.Category}
                  onChange={(e) => handleFilterChange('Category', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  {filterCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </th>

             
              <th className="px-3 py-2">
                <select
                  value={filters.Status}
                  onChange={(e) => handleFilterChange('Status', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  {filterStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </th>

              
              <th className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Filter by price"
                  value={filters.Product_Price}
                  onChange={(e) => handleFilterChange('Product_Price', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </th>

              
              <th className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Filter by quantity"
                  value={filters.Product_Quantity}
                  onChange={(e) => handleFilterChange('Product_Quantity', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </th>

              
              <th className="px-3 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.productId || index}
                  className="bg-white border-b hover:bg-gray-100"
                >
                     <td className="px-6 py-4">{`PRD${product.productId.toString().padStart(3, '0')}`}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.Product_Name}
                  </td>
                  <td style={{display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',}}
                    className="px-6 py-4">{product.Product_Description}</td>
                  <td className="px-6 py-4">{product.Category}</td>
                  <td  className={`px-6 py-4 font-medium ${ product.Status === "Out of Stock" ? "text-red-600" : "text-green-600" }`}>{product.Status}</td>
                  <td className="px-6 py-4 text-green-600">${product.Product_Price}</td>
                  <td className="px-6 py-4">{product.Product_Quantity}</td>
                  <td className="px-6 py-4"><img src={`http://localhost:3000/${product.Product_Image}`}></img></td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() => toggleMenu(product.productId)}
                      className="text-gray-600 hover:text-gray-900 text-2xl"
                    >
                      ⋮
                    </button>
                    {openMenu === product.productId && (
                      <div className="absolute right-6 top-10 z-10 w-32 bg-white border border-gray-300 rounded shadow-md">
                         <Link to={`/editProduct/${product.productId}`}>
                        <button
                          className="block px-4 py-2 w-full text-left text-sm hover:bg-blue-100"
                         
                        >
                        Edit
                        </button>
                        </Link> 
                        <button
                          className="block px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-red-100"
                          onClick={() => handleDelete(product.productId)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-gray-500" colSpan="6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
