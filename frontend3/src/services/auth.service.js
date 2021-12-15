import axios from 'axios';
import bcrypt from 'bcryptjs'

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: bcrypt.hash(user.password,bcrypt.genSalt(10)) //TODO: Testen
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: bcrypt.hash(user.password,bcrypt.genSalt(10)) //TODO: Testen
        });
    }
}

export default new AuthService();