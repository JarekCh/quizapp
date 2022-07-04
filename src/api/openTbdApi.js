import axios from "axios";

export const getQuizQuestion = (amount, type, category, difficulty) => {    
    return axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
        .then(({data}) => {                     
            return data;
        })
        .catch(err => {
            console.error(err)            
        });
}