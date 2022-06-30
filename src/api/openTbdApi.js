import axios from "axios";

export const getQuizQuestion = () => {    
    return axios.get('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.error(err)
            return null;
        });
}