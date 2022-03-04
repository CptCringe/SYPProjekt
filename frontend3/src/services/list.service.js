import axios from 'axios';


const API_URL = 'http://localhost:8081/api/';

class ListService {
    getLists(user) {
        return axios
            .get(API_URL + 'voclists', {params: {
                    userId: user.id,
                    //TODO: Testen
                }})
            .then(response => {
                localStorage.setItem('lists', JSON.stringify(response.data));
                return response.data;
            })
            .catch(err => {
                console.log(err)
            });
    }
    getList(id, cb){
        return axios
            .get(API_URL + 'voclists/getListById', {params: {listId: id}})
            .then(response => { console.log(response.data); cb(null, response.data);})
            .catch(err => {
                console.log(err);
                cb(err, null);
            });
    }

    getPublicLists(cb){
        return axios
            .get(API_URL+'ROUTE')
            .then(response => { console.log(response.data); cb(null, response.data);})
            .catch(err => {
                console.log(err);
                cb(err, null);
            })
    }

}

export default new ListService();