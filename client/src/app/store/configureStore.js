import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { counterSlice } from "../../features/contact/counterSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

// export function configureStore() {
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
    }
})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;