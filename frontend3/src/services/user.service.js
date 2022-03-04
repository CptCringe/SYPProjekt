import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    edituser(userId, newname, cb){
        return axios.post('http://localhost:8081/api/useredit', null,{headers: authHeader(), params: {userId: userId, username: newname}})
            .then( response =>{ cb(null, response);})
            .catch( err => {cb(err, null)});
    }
}

export default new UserService();