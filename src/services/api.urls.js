export const API_URLS ={
    saveSentEmail:{
        endpoint :'save',
        method:'POST'
    },
    getEmailfromType:{
        endpoint: 'emails',
        method: 'GET'
    },
    saveDraftEmails:{
        endpoint: 'save-draft',
        method:'POST'
    },
    moveEmailsToBin:{
        endpoint: 'bin',
        method:'POST'
    },
    toggleStarredEmail:{
        endpoint: 'starred',
        method: 'POST'
    },
    deleteEmail:{
        endpoint:'delete',
        method:'DELETE'
    },
    registerUser: { 
        endpoint: 'register', 
        method: 'POST' 
    },  // Registration endpoint
    loginUser: { 
        endpoint: 'login', 
        method: 'POST' 
    },        // Login endpoint
    forgotPassword: { 
        endpoint: 'forgot-password', 
        method: 'POST' 
    },
    resetPassword: {
        endpoint : 'reset-password',
        method: 'POST'
    }

}
