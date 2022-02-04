import FriendService from '../services/friend.service.js';


const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const friend = {
    namespaced: true,
    state: initialState,
    actions: {
        getFriends({ commit }, user) {
            return FriendService.getFriends(user).then(
                friends => {
                    commit('gotFriends', friends);
                    return Promise.resolve(friends);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },


    },

};