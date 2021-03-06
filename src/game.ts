import {Player} from './player';
import {Display} from './display';

export class Game {

    private players: Array<Player> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];
    private display: Display;

    constructor() {
        this.display = new Display();
        // Add a categories class
        // Add a questions class
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
        this.display.newPlayer(name, this.players);

        return true;
    }

    public roll(roll: number) {
        this.display.playerHasRolled(roll, this.getPlayer().name);

        this.move(roll);
    }

    private move(roll: number) {
        if (!this.getPlayer().inPenaltyBox) {
            this.movePlayer(roll);
        } else {

            if (roll % 2 != 0) {
                this.display.playerGettingOutOfPenaltyBox(this.getPlayer().name);
                this.isGettingOutOfPenaltyBox = true;

                this.movePlayer(roll);
            } else {
                this.display.playerNotGettingOutOfPenaltyBox(this.getPlayer().name);
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
        this.display.newLocationAndCategory(this.getPlayer().name, this.getPlayer().place, this.currentCategory());
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

        this.display.currentCategory(categories[this.currentCategory()].shift());
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
        this.display.wrongAnswerPenaltyBox(this.getPlayer().name);
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
        this.getPlayer().purse += 1;
        this.display.answerCorrectHasCoins(this.getPlayer().name, this.getPlayer().purse);

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