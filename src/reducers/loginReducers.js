export default function loginReducer(state = { isLogged: false, user: null}, action) {

    switch (action.type) {
        case 'LOGIN':
            return { isLogged: true, user: action.payload };
        case 'LOGOUT':
            return { isLogged: false, user: null };
        default:
            return state;
    };

};