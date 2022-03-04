import axios from 'axios';
//import bcrypt from 'bcryptjs'
import friendService from './friend.service';
const API_URL = 'http://35.192.175.7:8081/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password //TODO: Testen
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    friendService.getFriends(JSON.parse(localStorage.getItem('user')));
                }
                console.log(JSON.stringify(response.data))
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('friends');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password //TODO: Testen
        });
    }
}

export default new AuthService();