const initialState = [];


export default function msgSocket(state = initialState, action) {
    switch (action.type) {
        case 'newMsgSocket':
           return [...state, action.payload]
        case 'msgbdd':
            return action.payload
        case 'deleteMsg':
            return [...state.filter(state => state.id_message !== action.payload)]

        default: return state;
    }
}