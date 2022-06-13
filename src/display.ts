import {Player} from "./player";

export class Display {
    public newPlayer(name: string, players: Array<Player>) {
        console.log(name + " was added");
        console.log("They are player number " + players.length);
    }

    public playerHasRolled(roll: number, name: string) {
        console.log(name + " is the current player");
        console.log("They have rolled a " + roll);
    }

    public playerGettingOutOfPenaltyBox(name: string) {
        console.log(name + " is getting out of the penalty box");
    }

    public playerNotGettingOutOfPenaltyBox(name: string) {
        console.log(name + " is not getting out of the penalty box");
    }

    public newLocationAndCategory(name: string, place: number, category: string) {
        console.log(name + "'s new location is " + place);
        console.log("The category is " + category);
    }

    public currentCategory(category: string) {
        console.log(category)
    }

    public wrongAnswerPenaltyBox(name: string) {
        console.log('Question was incorrectly answered');
        console.log(name + " was sent to the penalty box");
    }

    public answerCorrectHasCoins(name: string, purse: number) {
        console.log('Answer was correct!!!!');
        console.log(name + " now has " +
            purse + " Gold Coins.");
    }

}