

// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
// import '../firebase/firestore';
// import { CosineSimilarity } from 'ml-lsh-js';


// const ProductRecommendation = () => {
//   const [userEmail, setUserEmail] = useState('');
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     // Fetch user's email from "Users" document
//     const fetchUserEmail = async () => {
//       const userId = firebase.auth().currentUser.uid;
//       const userRef = firebase.firestore().collection('Users').doc(userId);

//       try {
//         const userDoc = await userRef.get();
//         const userData = userDoc.data();
//         setUserEmail(userData.email);
//       } catch (error) {
//         console.error('Error fetching user email:', error);
//       }
//     };

//     fetchUserEmail();
//   }, []);

//   useEffect(() => {
//     // Fetch product data from "Products" document
//     const fetchProducts = async () => {
//       const productsRef = firebase.firestore().collection('Products');

//       try {
//         const snapshot = await productsRef.get();
//         const products = snapshot.docs.map((doc) => doc.data());
//         generateRecommendations(products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     const generateRecommendations = (products) => {
//       // Create a user-item matrix
//       const ratings_matrix = products.reduce((matrix, product) => {
//         matrix[product.id] = product.category === userEmail ? 1 : 0;
//         return matrix;
//       }, {});

//       // Calculate user similarity based on ratings
//       const user_similarity = new CosineSimilarity([Object.values(ratings_matrix)]);

//       // Calculate the weighted average of ratings for each item by the user's ratings and similarity
//       const user_ratings = Object.values(ratings_matrix);
//       const weighted_ratings = user_similarity.transform(user_ratings, true);

//       // Sort the recommendations in descending order
//       const sorted_indices = weighted_ratings[0].argsort('desc').selection;

//       // Get the top 5 recommended items
//       const top_n_items = sorted_indices.slice(0, 5);

//       // Fetch the recommended products from the original products array
//       const recommendedProducts = top_n_items.map((index) => products[index]);

//       setRecommendations(recommendedProducts);
//     };

//     if (userEmail) {
//       fetchProducts();
//     }
//   }, [userEmail]);

//   return (
//     <div>
//       <h2>Product Recommendations for User {userEmail}</h2>
//       <ul>
//         {recommendations.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductRecommendation;
