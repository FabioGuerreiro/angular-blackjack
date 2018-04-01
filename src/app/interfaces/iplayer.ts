import { Icard } from './icard';

export const enum playerStatus {
    None = 0,
    Win = 1,
    Lose = 2
}

export interface Iplayer {
    Id: number;
    Name: string;
    Human: boolean;
    Active: boolean;
    Status: playerStatus;
    StatusText: string;
    Hand?: Icard[];
    Points?: number;
}
