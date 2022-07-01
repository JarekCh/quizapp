import axios from "axios";

export const getQuizQuestion = () => {    
    return axios.get('https://opentdb.com/api.php?amount=6&type=multiple')
        .then(({data}) => {                     
            return data;
        })
        .catch(err => {
            console.error(err)            
        });
}