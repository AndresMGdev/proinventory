import axios from "axios";

const url ='http://localhost:3000/api/v1/';


export default axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});