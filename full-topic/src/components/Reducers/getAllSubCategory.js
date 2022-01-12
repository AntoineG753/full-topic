

const initialState = [];


export default function getAllSubCategory(state = initialState, action) {
    switch (action.type) {
        case 'get_allSubCategory':
            return action.payload

        default: return state;
    }
}