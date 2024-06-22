import axios from 'axios'

const API_URL = 'https://capstone-project-gmail-clone-backend.onrender.com';

const API_GMAIL = async (urlObject,payload,type) => {
    return await axios ({
        method:urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}`,
        data:payload
        // headers: {
        //     Authorization: `Bearer ${token}`, // Include Authorization header with token
        //   }
    })
}

export default API_GMAIL
