import Api from './Api'

class Package extends Api {
    static getPackages() {
        const response = this.post('/getIrisSubcription',{})
        return response

    }

    static getIrisSub(data) {
        const response = this.post('/getIrisOrg',data)
        return response
    }

    static getCurrentPackage(data) {
        const response = this.post('/fetchIrisUser',data)
        return response
    }

    static byPackage(data) {
        const response = this.post("/createIrisProdPayLink",data)
        return response
    }

    static getPymentHistory(data){
        const response = this.post('/paymentHistory',data)
        return response        
    }    
}

export default Package