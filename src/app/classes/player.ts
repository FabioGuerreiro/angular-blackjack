import { Iplayer } from '../interfaces/iplayer';
import { Card } from './card';

export class Player implements Iplayer {
    public Hand: Card[];
    public Points: number;
    public Active: boolean;

    constructor(
        public Id: number,
        public Name: string,
        public Human: boolean = true
    ) {
        this.Active = false;
        this.Hand = [];
        this.Points = 0;
    }
}
