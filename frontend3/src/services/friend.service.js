import axios from 'axios';
//import bcrypt from 'bcryptjs'

const API_URL = 'http://localhost:8081/api/';

class FriendService {
    getFriends(user) {
        return axios
            .get(API_URL + 'friends', {
                userId: user.id,
                 //TODO: Testen
            })
            .then(response => {

                return response.data;
            });
    }


}

export default new FriendService();