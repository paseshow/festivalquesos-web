import { CommonUser } from './user';

export class Evento extends CommonUser {
    nameEvent: string;
    linkEvent: string;
    active: boolean | string;
}