// const initialState = {
//   cart: {
//     content: [],
//   },
//   admin: { content: "Fabio" },
// };

// const mainReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_JOB":
//       return {
//         ...state,
//         cart: {
//           ...state.cart,
//           content: [...state.cart.content, action.payload],
//         },
//       };
//     case "REMOVE_JOB":
//       return {
//         ...state,
//         cart: {
//           ...state.cart,
//           content: state.cart.content.filter((_, i) => i !== action.payload),
//         },
//       };
//     default:
//       return state;
//   }
// };

// export default mainReducer;
