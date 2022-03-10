import axios from 'axios';
//import bcrypt from 'bcryptjs'

//const API_URL = 'http://vocabattle.ddns.net:8081/api/';
const API_URL = 'http://localhost:8081/api/';

class FriendService {
    getFriends(user) {
        return axios
            .get(API_URL + 'friends', {params: {
                userId: user.id,
                 //TODO: Testen
            }})
            .then(response => {
                localStorage.setItem('friends', JSON.stringify(response.data));
                return response.data;
            });
    }
    addFriend(user, id){
        return axios
            .post(API_URL + 'friends/add', {userId: user.id, friendId: id}).then(response => { console.log(response.data)});
    }

    removeFriend(user, id){
        return axios
            .delete(API_URL + 'friends/remove', {params: {userId: user.id, friendId: id}}).then(response => { console.log(response.data)});
    }
}

export default new FriendService();