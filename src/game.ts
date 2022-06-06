export class Game {

    private players: Array<string> = [];
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
        this.players.push(name);
        this.places[this.howManyPlayers()] = 0;
        this.purses[this.howManyPlayers()] = 0;
        this.inPenaltyBox[this.howManyPlayers()] = false;

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        console.log(this.players[this.currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);

        if (this.inPenaltyBox[this.currentPlayer]) {
            this.playerInPenaltyBox(roll);
        } else {
            this.playerNotInPenaltyBox(roll);
        }
    }

    private playerNotInPenaltyBox(roll: number) {
        this.movePlayer(roll);
        this.logUpdatedStatus();
        this.askQuestion();
    }

    private logUpdatedStatus() {
        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
    }

    private movePlayer(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }
    }

    private playerInPenaltyBox(roll: number) {
        if (this.isOdd(roll)) {
            this.escapePenaltyBox();

            this.movePlayer(roll);
            this.logUpdatedStatus()
            this.askQuestion();
        } else {
            this.remainInPenaltyBox();
        }
    }


    private remainInPenaltyBox() {
        console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
    }

    private escapePenaltyBox() {
        this.isGettingOutOfPenaltyBox = true;
        console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
    }

    private isOdd(roll: number) {
        return roll % 2 != 0;
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            console.log(this.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            console.log(this.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            console.log(this.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            console.log(this.rockQuestions.shift());
    }

    private currentCategory(): string {
        function monkey() {
            if (this.places[this.currentPlayer] == 0)
                return 'Pop';
            if (this.places[this.currentPlayer] == 4)
                return 'Pop';
            if (this.places[this.currentPlayer] == 8)
                return 'Pop';
            if (this.places[this.currentPlayer] == 1)
                return 'Science';
            if (this.places[this.currentPlayer] == 5)
                return 'Science';
            if (this.places[this.currentPlayer] == 9)
                return 'Science';
            if (this.places[this.currentPlayer] == 2)
                return 'Sports';
            if (this.places[this.currentPlayer] == 6)
                return 'Sports';
            if (this.places[this.currentPlayer] == 10)
                return 'Sports';
            return 'Rock';
        }

        return monkey.call(this);
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public correctlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
                console.log('Answer was correct!!!!');
                this.purses[this.currentPlayer] += 1;
                console.log(this.players[this.currentPlayer] + " now has " +
                    this.purses[this.currentPlayer] + " Gold Coins.");

                var winner = this.didPlayerWin();
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;

                return winner;
            } else {
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;
                return true;
            }


        } else {

            console.log("Answer was corrent!!!!");

            this.purses[this.currentPlayer] += 1;
            console.log(this.players[this.currentPlayer] + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");

            var winner = this.didPlayerWin();

            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;

            return winner;
        }
    }

}
