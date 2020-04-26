import {RESET, SAVE_ITEMS} from "../actions";

const initialState: any = [];

const items = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_ITEMS:
            return [
                ...action.payload
            ];
        case RESET:
            return [
                ...initialState
            ];
        default:
            return state
    }
}
export default items;
