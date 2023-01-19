import axios from 'axios';

/** add expense function */
export async function addExpense(values) {
    try {
        const token = localStorage.getItem('token');
        if(!token) return Promise.reject({error: "You must first login to add expense!"});
        const {data} = await axios.put('api/addExpense',values, {headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve(data);
    }
    catch(error) {
        return Promise.reject({error: "Unable to add expense! Try again!"});
    }
}

/** add member function */
export async function addMember(values) {
    try {
        const token = localStorage.getItem('token');
        if(!token) return Promise.reject({error: "You must first login to add member!"});
        const {data} = await axios.put('api/addMember',values, {headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve(data);
    }
    catch(error) {
        return Promise.reject({error: "Unable to add member! Try again!"});
    }
}

/** update member function */
export async function updateMember(values) {
    try {
        const token = localStorage.getItem('token');
        if(!token) return Promise.reject({error: "You must first login to add member!"});
        const {data} = await axios.put('api/editMember',values, {headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve(data);
    }
    catch(error) {
        return Promise.reject({error: "Unable to add member! Try again!"});
    }
}

/** delete member function */
export async function deleteMember(values) {
    try {
        const token = localStorage.getItem('token');
        if(!token) return Promise.reject({error: "You must first login to add member!"});
        const {data} = await axios.put('api/deleteMember',values, {headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve(data);
    }
    catch(error) {
        return Promise.reject({error: "Unable to add member! Try again!"});
    }
}