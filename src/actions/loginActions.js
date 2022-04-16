export function loginAction(user) {
    return {type: 'LOGIN', payload: user};
};

export function logoutAction() {
    return {type: 'LOGOUT'};
};