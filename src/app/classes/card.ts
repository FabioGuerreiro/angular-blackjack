import { Icard } from '../interfaces/icard';

export class Card implements Icard {
    constructor(
        public Suit: string,
        public Value: string
    ) {
    }

    public set Weight(weight: number) {
        this.Weight = weight;
    }
}
