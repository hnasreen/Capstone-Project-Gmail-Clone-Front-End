import axios from 'axios'

const API_URL = 'https://capstone-project-gmail-clone-backend.onrender.com';

const API_GMAIL = async (urlObject,payload,type) => {
    
    return await axios ({
        method:urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}?userID=${window.localStorage.getItem("userID")}`,
        data:payload,
        // header:{"content-type":"application/json"},
        withCredentials:true
    })
}

export default API_GMAIL



