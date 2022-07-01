import axios from "axios";

export const getQuizQuestion = () => {    
    return axios.get('https://opentdb.com/api.php?amount=4&type=multiple')
        .then(res => {                     
            return (res);
        })
        .catch(err => {
            console.error(err)            
        });
}