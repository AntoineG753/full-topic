

const initialState = [];


export default function getAllCategory(state = initialState, action) {
    switch (action.type) {
        case 'get_allCategory':
            return action.payload

        default: return state;
    }
}