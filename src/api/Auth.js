import Api from "./Api"

class Auth extends Api {
    static login(data) {

        const res = this.post('/login', data).catch(() => {
            console.log("error")
        })
        return res
    }

    static logOut(data) {
        const res = this.post('/logout', data)
        return res
    }
}

export default Auth