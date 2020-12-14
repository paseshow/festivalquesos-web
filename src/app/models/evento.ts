import { CommonUser } from './user';

export class Evento extends CommonUser {
    nameEvent: string;
    linkEvent: string;
    linkChat?: string;
    activeChat: boolean | string;
    active: boolean | string;
    fechaEvent: string;
}

export class EventoStream {
    idEvento: number;
    fechaEvento: string;
}

