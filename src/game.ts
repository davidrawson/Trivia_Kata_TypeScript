class Player {
    public name: string;
    public purse: number;
    public place: number;
    public inPenaltyBox: boolean;

    constructor(name: string, purse: number, place: number, inPenaltyBox: boolean) {
        this.name = name;
        this.purse = purse;
        this.place = place;
        this.inPenaltyBox = inPenaltyBox;
    }
}

export class Game {

    private players: Array<Player> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
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
            this.rockQuestions.push(this.createRockQuestion(i));
        }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }

    public add(name: string): boolean {
        // new player with a purse, a place, and penalty box toggle
        // but keep the players array
        // data clump
        const player = new Player(name, 0, 0, false);

        this.players.push(player);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        console.log(this.players[this.currentPlayer].name + " is the current player");
        console.log("They have rolled a " + roll);

        this.move(roll);
    }

    private move(roll: number) {
        // if (this.inPenaltyBox[this.currentPlayer]) {
        if (this.players[this.currentPlayer].inPenaltyBox) {

            if (roll % 2 != 0) {
                this.isGettingOutOfPenaltyBox = true;

                console.log(this.players[this.currentPlayer].name + " is getting out of the penalty box");

                this.movePlayer(roll);
            } else {
                console.log(this.players[this.currentPlayer].name + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            this.movePlayer(roll);
        }
    }

    private movePlayer(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        console.log(this.players[this.currentPlayer].name + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
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

        return positionCategory[this.places[this.currentPlayer]]
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer].name + " was sent to the penalty box");
        // this.inPenaltyBox[this.currentPlayer] = true;
        this.players[this.currentPlayer].inPenaltyBox = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public correctlyAnswered(): boolean {
        if (this.players[this.currentPlayer].inPenaltyBox) {
            if (this.isGettingOutOfPenaltyBox) {
                return this.playerWin();
            } else {
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;
                return true;
            }
        } else {
            return this.playerWin();
        }
    }

    private playerWin() {
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer].name + " now has " +
            this.purses[this.currentPlayer] + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;

        return winner;
    }
}