export class User {
    private _name: string;
    private _mail: string;
    private uid: string;

    constructor(userTO: any) {
        if (userTO != null) {
            this.fromTO(userTO);
        }
    }

    public get mail(): string {
        return this._mail;
    }

    public set mail(value: string) {
        this._mail = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get $uid(): string {
        return this.uid;
    }

    public set $uid(value: string) {
        this.uid = value;
    }

    public toTO(): any {
        return {
            name: this.name,
            mail: this.mail,
            uid: this.$uid
        };
    }

    private fromTO(userTO: any) {
        this.name = userTO.name;
        this.mail = userTO.mail;
        this.$uid = userTO.uid;
    }

}
