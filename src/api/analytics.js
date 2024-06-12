import Api from "./Api"

class Analytics extends Api {
    static faceMash(data){
        const res = this.post('/analyze',data)
        return res   
    }
}

export default Analytics