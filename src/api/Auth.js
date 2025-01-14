import Api from "./Api"

class Auth extends Api {
    static login(data) {
        const res = this.post('/get_user_token', data)
        return res
    }

    static signUp(data) {
        const res = this.post('/addIrisOrg', data)
        return res
    }    

    static logOut(data) {
        const res = this.post('/logout', data)
        return res
    }

    static forgetpass(data){
        const res = this.post('/mailResetPwdLink', data)
        return res        
    }

    static updatePassword(data){
        const res = this.post('/updateResetPassword', data)
        return res        
    }    

    static changePassword(data) {
        const res = this.post('/updatePassword', data)
        return res           
    }

    static refreshToken(data) {
        const response = this.post("/updateAuthToken",data)
        return response
    }
}

export default Auth