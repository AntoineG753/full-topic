



const initialState = [];


export default function listConnected(state = initialState, action) {
    switch (action.type) {
        case 'listConnected':
            return action.payload
        case 'listConnectedClear':
            return initialState

        default: return state;
    }
}
