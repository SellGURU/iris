class GenerateId {
    static id = Math.floor(Math.random() * (100000))
    static resolveid() {
        this.id = this.id + 1
        return this.id
    }
}

export default GenerateId