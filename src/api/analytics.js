import Api from "./Api"

class Analytics extends Api {
    static analyticsImage(data){
        const res = this.post('/analyzeIrisScan',data)
        return res   
    }
}

export default Analytics