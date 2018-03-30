import { Icard } from './icard';

export interface Iplayer {
    Id: number;
    Name: string;
    Human: boolean;
    Active: boolean;
    Hand?: Icard[];
    Points?: number;
}
