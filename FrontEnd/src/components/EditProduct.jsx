import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function EditProduct() {
 const [productName,setProductName]=useState("")
    const [productDesc,setProductDesc]=useState("")
    const [category,setCategory]=useState("")
    const [productPrice,setProductPrice]=useState("")
    const [productQuantity,setProductQuantity]=useState("")
    const [status,setStatus]=useState("")
    const [productImage,setProductImage]=useState()
    
    
    
 
    let {pid} = useParams();
    
   

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:3000/products/getProduct/${pid}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          const data = await res.json();
          
          if (res.status === 200 && data.product) {
            const product_Data = data.product;
            setProductName(product_Data.Product_Name || "");
            setProductDesc(product_Data.Product_Description || "");
            setCategory(product_Data.Category || "");
            setProductPrice(product_Data.Product_Price?.toString() || ""); 
            setProductQuantity(product_Data.Product_Quantity?.toString() || "");
            setStatus(product_Data.Status || "");
            setProductImage(product_Data.Product_Image ||"")
            
            
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchProduct();
    }, [pid]);
    
    const formHandler=async(e)=>{
         e.preventDefault()
         const form = new FormData();
         form.append('Product_Name', productName);
         form.append('Product_Description', productDesc);
         form.append('Category', category);
         form.append('Product_Price',productPrice);
         form.append('Product_Quantity', productQuantity);
         form.append('Status', status);
         if (productImage instanceof File) {
            form.append('Product_Image', productImage);
          }
         try{
                 const res=await fetch(`http://localhost:3000/products/edit/${pid}`,{
 
                     method:"POST",
                     headers:{
                         
                         Authorization: `${localStorage.getItem('token')}`,
                     },
                     body:form
 
                 });
                 const data = await res.json();
                 if (data.status === 200) {
                   alert(data.msg);
                 } else {
                   alert(data.msg || 'Failed to add product');
                 }
         }catch(error){
             console.log(error)
         }
     }
   return (
     <div className="min-h-screen flex items-center justify-center bg-white-100 light:bg-gray-800">
       <div className="w-full max-w-md p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
         <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
           Update Product
         </h2>
         <form onSubmit={formHandler} method="POST" className="space-y-4">
           <div>
             <label htmlFor="ProductName" className="block text-sm font-medium text-gray-900 dark:text-white">
               Product Name
             </label>
             <input
               id="ProductName"
               name="ProductName"
               type="text"
               value={productName}
               onChange={(e)=>setProductName(e.target.value)}
               
               className="mt-1 block w-full rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             />
           </div>
 
           <div>
             <label htmlFor="ProductDescription" className="block text-sm font-medium text-gray-900 dark:text-white">
               Product Description
             </label>
             <textarea
               id="ProductDescription"
               rows="4"
               placeholder="Write Product Description"
               value={productDesc}
               onChange={(e)=>setProductDesc(e.target.value)}
               className="mt-1 block w-full p-2.5 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
             ></textarea>
           </div>
 
           <div>
             <label htmlFor="Category" className="block text-sm font-medium text-gray-900 dark:text-white">
               Category
             </label>
             <input
               id="Category"
               name="Category"
               type="text"
               value={category}
               onChange={(e)=>setCategory(e.target.value)}
               
               className="mt-1 block w-full rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             />
           </div>
 
           <div>
             <label htmlFor="ProductPrice" className="block text-sm font-medium text-gray-900 dark:text-white">
               Product Price
             </label>
             <input
               id="ProductPrice"
               name="ProductPrice"
               type="text"
               
               value={productPrice}
               onChange={(e)=>setProductPrice(e.target.value)}
               className="mt-1 block w-full rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             />
           </div>
 
           <div>
             <label htmlFor="ProductQuantity" className="block text-sm font-medium text-gray-900 dark:text-white">
               Product Quantity
             </label>
             <input
               id="ProductQuantity"
               name="ProductQuantity"
               type="text"
               value={productQuantity}
               onChange={(e)=>setProductQuantity(e.target.value)}
               
               className="mt-1 block w-full rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             />
           </div>
 
           <div>
             <label htmlFor="StockStatus" className="block text-sm font-medium text-gray-900 dark:text-white">
               Stock Status
             </label>
             <select
               id="StockStatus"
               value={status}
         onChange={(e)=>setStatus(e.target.value)}
               className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
             >
               <option value="">Choose status</option>
               <option value="In Stock">In Stock</option>
               <option value="Out of Stock">Out of Stock</option>
             </select>
           </div>
           <div>
             <label htmlFor="ProductImage" className="block text-sm font-medium text-gray-900 dark:text-white">
               Product Image
             </label>
             <input
               id="ProductImage"
               name="ProductImage"
               onChange={(e)=>setProductImage(e.target.files[0])}
               type="file"
               accept="image/*"
               className="mt-1 block w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
             />
           </div>
           <div>
            <img src={`http://localhost:3000/${productImage}`}></img>
           </div>
           <div>
             <button
               type="submit"
               className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
             >
               Update Product
             </button>
           </div>
         </form>
       </div>
     </div>
   );
}

export default EditProduct