class GenerateId {
    static id = Math.floor(100000 + Math.random() * 900000)
    static resolveid() {
        this.id = this.id + 1
        return this.id
    }
}

export default GenerateId