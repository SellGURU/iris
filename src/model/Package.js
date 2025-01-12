class Package {
    status = false
    information = {
        name:'',
        cycle:'',
        cost:0,
        useage:0,
        bundle:0,
        subCode:"+sPwwWEH4syZZdnvq5k/jA==",
        subprice_code:"+sPwwWEH4syZZdnvq5k/jA==",        
    }
    constructor(info){
        this.information = info
    }

    isActive() {
        if(this.information){
            return this.information.bundle > this.information.useage
        }else {
            return false
        }
    }

    isExist() {
        return this.information!= undefined && this.information.bundle > 0
    }

    getInformation() {
        if(this.information) {
            return this.information
        }else {
            return {
                name:'No available package',
                cycle:'Yearly',
                cost:'No Records',
                useage:0,
                bundle:0               
            }
        }
    }

    getRemining() {
        if(this.information){
            return this.information.bundle - this.information.useage
        }
        return 0
    }

    getPercentUsage(){
        if(this.information){
            return this.information.useage / this.information.bundle * 100
        }
        return 0
    }

    getPercentRemining(){
        if(this.information){
            return this.getRemining() / this.information.bundle * 100
        }
    }    
}

export default Package