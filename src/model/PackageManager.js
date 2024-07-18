import Package from "./Package"

class PackageManager {
    package = new Package()

    updatePackage(pak) {
        this.package = pak
    }

    getPackage() {
        return this.package
    }
}

export default PackageManager