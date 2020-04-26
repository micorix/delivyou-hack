import {SAVE_CITY} from "../actions";

const initialState: any = {
    city: ''
};

const city = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_CITY:
            return {
                city: action.payload
            };
        default:
            return state
    }
}
export default city;
