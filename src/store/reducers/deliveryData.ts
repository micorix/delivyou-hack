import {RESET, SAVE_DELIVERY_DATA} from "../actions";

const initialState: any = {};

const deliveryData = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_DELIVERY_DATA:
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
export default deliveryData;
