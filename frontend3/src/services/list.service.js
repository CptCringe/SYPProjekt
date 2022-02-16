import axios from 'axios';


const API_URL = 'http://localhost:8081/api/';

class ListService {
    getLists(user) {
        return axios
            .get(API_URL + '', {params: {
                    userId: user.id,
                    //TODO: Testen
                }})
            .then(response => {
                localStorage.setItem('lists', JSON.stringify(response.data));
                return response.data;
            });
    }
    getList(id){
        return axios
            .get(API_URL + '', {params: {listId: id}}).then(response => { console.log(response.data); return response.data;});
    }

}

export default new ListService();