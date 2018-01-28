import { User } from './user';
import { CalendarEvent } from 'angular-calendar';
import { EventAction, EventColor } from 'calendar-utils';

export class Lending implements CalendarEvent {
    start: Date;
    end?: Date;
    title: string; // nom de l'emprunteur
    mail: string; // mail de l'emprunteur
    color: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
    draggable?: boolean;
    meta?: any;

    constructor(lending: any) {
        this.fromTO(lending);
    }

    public toTO(): any {
        return {
            start: this.start.getTime(),
            end: this.end.getTime(),
            title: this.title,
            mail: this.mail,
            color: this.color,
            allDay: true
        };
    }

    private fromTO(lendingTO: any) {
        this.start = new Date(lendingTO.start);
        this.end = new Date(lendingTO.end);
        this.title = lendingTO.title;
        this.mail = lendingTO.mail;
        this.color = lendingTO.color;
        this.allDay = true;
    }

}
