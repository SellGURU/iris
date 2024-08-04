import Api from './Api'

class Package extends Api {
    static getPackages() {
        const response = this.post('/getIrisSubcription',{})
        return response

    }
}

export default Package