export class Player {
    public name: string;
    public purse: number;
    public place: number;
    public inPenaltyBox: boolean;

    constructor(name: string) {
        this.name = name;
        this.purse = 0;
        this.place = 0;
        this.inPenaltyBox = false;
    }
}