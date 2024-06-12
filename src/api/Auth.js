import Api from "./Api"

class Auth extends Api  {
    static login(data) {
        const res = this.post('/login',data)
        return res
    }
}

export default Auth