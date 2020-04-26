import {RESET, SAVE_SHIPPING_DATA} from "../actions";

const initialState: any = {};

const shippingData = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_SHIPPING_DATA:
            return {
                ...action.payload
            };
        case RESET:
            return {
                ...initialState
            };
        default:
            return state
    }
}
export default shippingData;
