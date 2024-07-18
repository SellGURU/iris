class Invoice {
    information = {
        id :'',
        billingDate:'',
        package:'',
        amount:'',
        status:''
    }

    constructor(info) {
        this.information = info
    }
}

export default Invoice