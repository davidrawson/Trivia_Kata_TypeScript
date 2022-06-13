class Player {
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

export class Game {

    private players: Array<Player> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
        }
    }

    public add(name: string): boolean {
        // new player with a purse, a place, and penalty box toggle
        // but keep the players array
        // data clump
        const player = new Player(name);

        this.players.push(player);

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    public roll(roll: number) {
        console.log(this.getPlayer().name + " is the current player");
        console.log("They have rolled a " + roll);

        this.move(roll);
    }

    private move(roll: number) {
        if (!this.getPlayer().inPenaltyBox) {
            this.movePlayer(roll);
        } else {

            if (roll % 2 != 0) {
                this.isGettingOutOfPenaltyBox = true;

                console.log(this.getPlayer().name + " is getting out of the penalty box");

                this.movePlayer(roll);
            } else {
                console.log(this.getPlayer().name + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        }
    }

    private getPlayer() {
        return this.players[this.currentPlayer];
    }

    private movePlayer(roll: number) {
        this.getPlayer().place = this.getPlayer().place + roll;
        this.playerOutOfBounds();

        console.log(this.getPlayer().name + "'s new location is " + this.getPlayer().place);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
    }

    private playerOutOfBounds() {
        if (this.getPlayer().place > 11) {
            this.getPlayer().place = this.getPlayer().place - 12;
        }
    }

    private askQuestion(): void {
        const categories = {
            'Pop': this.popQuestions,
            'Science': this.scienceQuestions,
            'Sports': this.sportsQuestions,
            'Rock': this.rockQuestions
        }

        console.log(categories[this.currentCategory()].shift())
    }

    private currentCategory(): string {
        const positionCategory = {
            0: 'Pop',
            1: 'Science',
            2: 'Sports',
            3: 'Rock',
            4: 'Pop',
            5: 'Science',
            6: 'Sports',
            7: 'Rock',
            8: 'Pop',
            9: 'Science',
            10: 'Sports',
            11: 'Rock',
        };

        return positionCategory[this.getPlayer().place]
    }

    private didPlayerWin(): boolean {
        return !(this.getPlayer().purse == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.getPlayer().name + " was sent to the penalty box");
        this.getPlayer().inPenaltyBox = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public correctlyAnswered(): boolean {
        if (this.getPlayer().inPenaltyBox && !this.isGettingOutOfPenaltyBox) {
            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
            return true;
        }
        return this.playerWin();
    }

    private playerWin() {
        console.log('Answer was correct!!!!');
        this.getPlayer().purse += 1;
        console.log(this.getPlayer().name + " now has " +
            this.getPlayer().purse + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.resetPlayer();

        return winner;
    }

    private resetPlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }
}