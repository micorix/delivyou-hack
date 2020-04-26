import items from "./items";
import {combineReducers} from "redux";
import shippingData from "./shippingData";
import city from "./city";
import deliveryData from "./deliveryData";

const rootReducer = combineReducers({
    items,
    shippingData,
    city,
    deliveryData
});

export default rootReducer;
