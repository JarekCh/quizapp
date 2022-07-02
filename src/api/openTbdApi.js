import axios from "axios";

export const getQuizQuestion = (amount, type) => {    
    return axios.get(`https://opentdb.com/api.php?amount=${amount}&type=${type}`)
        .then(({data}) => {                     
            return data;
        })
        .catch(err => {
            console.error(err)            
        });
}