import Package from "./Package"

class PackageManager {
    package = new Package()
    constructor(){
        let pak = JSON.parse(localStorage.getItem('package'))
        if(pak){
            const newPackage = new Package(pak.information)
            this.package = newPackage
        }
    }
    updatePackage(pak) {
        this.package = pak
        localStorage.setItem("package",JSON.stringify(pak))
    }

    getPackage() {
        return this.package
    }
    usePackage(){
        this.package.information.useage = this.package.information.useage + 1
        this.syncLocalStorage()
    }

    syncLocalStorage() {
        localStorage.setItem("package",JSON.stringify(this.package))
    }
}

export default PackageManager