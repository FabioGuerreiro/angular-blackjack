import { Iplayer } from '../interfaces/iplayer';
import { Card } from './card';

export class Player implements Iplayer {
    public Hand: Card[];
    public Points: number;

    constructor(
        public Id: number,
        public Name: string,
        public Human: boolean = true
    ) {
    }
}
