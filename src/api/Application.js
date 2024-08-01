import Api from "./Api"

class Application extends Api {
    static getScanList(data) {
        const response = this.post('/listIrisScans',data)
        return response
    }
}

export default Application