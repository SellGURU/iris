import Api from "./Api"

class Auth extends Api {
    static login(data) {
        const res = this.post('/get_user_token', data)
        return res
    }

    static signUp(data) {
        const res = this.post('/addIrisUser', data)
        return res
    }    

    static logOut(data) {
        const res = this.post('/logout', data)
        return res
    }

}

export default Auth