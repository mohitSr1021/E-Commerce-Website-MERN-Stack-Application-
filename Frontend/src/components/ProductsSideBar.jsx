// import "../styles/prodcutsSideBar.css";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../redux/slices/categoriesSlice";
// import ClipLoader from "react-spinners/ClipLoader";

// const ProductsSideBar = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.categories.categories);
//   const isLoading = useSelector((state) => state.categories.isLoading);
//   const isError = useSelector((state) => state.categories.isError);
//   const [checked, setChecked] = useState([]);

//   console.log("checked=========== => 0_0",checked);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className="loader-container">
//         <ClipLoader className="loader" />
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>Error fetching categories.</div>;
//   }

//   // Product Filter
//   const handleFilterProduct = (value, cid) => {
//     // here value parameter will take the boolean value of whether the checkbox is checked (true) or unchecked (false).
//     let allCheckedCategories = [...checked]; // Array to hold all checked category IDs.all checked cid's will come here.
//     if (value) {
//       allCheckedCategories.push(cid); // Add the category ID to the array if the checkbox is checked.
//     } else {
//       allCheckedCategories = allCheckedCategories.filter((c) => c !== cid); // Remove the category ID from the array if the checkbox is unchecked.
//     }
//     setChecked(allCheckedCategories);
//     console.log("checked checked checked 0___0", allCheckedCategories);
//   };

//   return (
//     <section className="prodcutsSideBar text-center text-white py-3 mb-4">
//       {JSON.stringify(checked, null, 4)}

//       <h4 className="p-1 mb-2 fw-bolder">Categories</h4>
//       <ul className="list-unstyled px-2">
//         {isLoading ? (
//           <div className="loader-container">
//             <ClipLoader className="loader" />
//           </div>
//         ) : (
//           categories.map((category) => (
//             <li key={category._id}>
//               <label className="d-flex align-items-center justify-content-center">
//                 <div className="w-10 p-1 d-flex">
//                   <input
//                     type="checkbox"
//                     name={category.name}
//                     onChange={(e) => {
//                       handleFilterProduct(e.target.checked, category._id);
//                     }}
//                   />
//                   <span className="checkmark m-0"></span>
//                 </div>
//                 <div className="w-100 d-flex px-1">{category.name}</div>
//               </label>
//             </li>
//           ))
//         )}
//       </ul>
//     </section>
//   );
// };

// export default ProductsSideBar;
