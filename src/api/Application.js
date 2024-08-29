import Api from "./Api"

class Application extends Api {
    static getScanList(data) {
        const response = this.post('/scanCommentsList',data)
        return response
    }

    static addClient(data) {
        const response = this.post('/addClient',data)
        return response
    }


}

export default Application