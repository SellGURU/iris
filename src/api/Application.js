import Api from "./Api"

class Application extends Api {
    static getScanList(data) {
        const response = this.post('/fetchIrisOrgScanList ',data)
        return response
    }

    static addClient(data) {
        const response = this.post('/addClient',data)
        return response
    }

    static getScanDetails(data) {
        const response = this.post('/getIrisScanDetails',data)
        return response
    }

    static addComment(data) {
        const response = this.post('/upsertComment',data)
        return response
    }

    static getComments(data) {
        const response = this.post('/listComments',data)
        return response        
    }

}

export default Application