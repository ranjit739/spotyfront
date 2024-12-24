const store = configureStore({
    reducer: {
      counter: counterReducer, // Add your reducers here
    },
  });
  
  export default store;