export class ProcessModel {
    constructor(public arrival: number, public cpu_time: number, public name: string, public unix_data: UnixData = new UnixData()) {
    }
}

export class UnixData {
    constructor (public p_usr: number = 60, public p_cpu = 0) {}
}
