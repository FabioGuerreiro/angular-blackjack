import { Iplayer, playerStatus } from '../interfaces/iplayer';
import { Card } from './card';

export class Player implements Iplayer {
    public Hand: Card[];
    public Points: number;
    public Active: boolean;
    public Status: playerStatus;
    public StatusText: string;

    constructor(
        public Id: number,
        public Name: string,
        public Human: boolean = true
    ) {
        this.Active = false;
        this.Status = playerStatus.None;
        this.StatusText = '';
        this.Hand = [];
        this.Points = 0;
    }
}
