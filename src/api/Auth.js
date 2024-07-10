import Api from "./Api"

class Auth extends Api {
    static login(data) {

        const res = this.post('/login', data)
        return res
    }

    static logOut(data) {
        const res = this.post('/logout', data)
        return res
    }
}

export default Auth