class Package {
    status = false
    information = {
        name:'',
        cycle:'',
        cost:0,
        useage:0,
        bundle:0
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
        return this.information!= undefined
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
}

export default Package