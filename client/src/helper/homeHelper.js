import axios from 'axios';

/** add express function */
export async function addExpense(values) {
    try {
        const token = localStorage.getItem('token');
        if(!token) return Promise.reject({error: "You must first login to add expense!"});
        const {data} = await axios.put('api/addExpense',values, {headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve(data);
    }
    catch(error) {
        return Promise.reject({error: "Uable to add expense! Try again!"});
    }
}