import { configureStore } from '@reduxjs/toolkit'; // createStore(구식_redux) = configureStore(신식_redux/toolkit)
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer
});

export default store;
