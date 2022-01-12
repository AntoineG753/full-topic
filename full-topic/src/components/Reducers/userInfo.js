
const initialState = {};


export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case 'get_userInfo':
            return action.payload

        default: return state;
    }
}


