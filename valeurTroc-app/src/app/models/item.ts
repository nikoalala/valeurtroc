import { Lending } from './lending';
import { User } from './user';

export class Item {
    private _name: string;
    private _type: string;
    private _description: string;
    private _photo: string;
    private _owner: User;
    private _lendings: Lending[];
    private _key: string;

    constructor(itemTO: any) {
        if (itemTO != null) {
            this.fromTO(itemTO);
        } else {
            this.owner = new User(null);
            this.lendings = [];
        }
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
    }

    public get owner(): User {
        return this._owner;
    }

    public set owner(value: User) {
        this._owner = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get photo(): string {
        return this._photo;
    }

    public set photo(value: string) {
        this._photo = value;
    }

    public get lendings(): Lending[] {
        return this._lendings;
    }

    public set lendings(value: Lending[]) {
        this._lendings = value;
    }

    public get key(): string {
        return this._key;
    }

    public set key(value: string) {
        this._key = value;
    }

    public toTO(): any {
        const obj: any = {};
        obj.name = this.name;
        obj.type = this.type;
        obj.description = this.description;
        if (this.owner != null) {
            obj.owner = this.owner.$uid;
        }

        obj.lendings = [];
        if (this.lendings != null) {
            for (const lend of this.lendings) {
                obj.lendings.push(lend.toTO());
            }
        }
        return obj;
    }

    private fromTO(itemTO: any) {

        this.name = itemTO.name;
        this.type = itemTO.type;
        this.description = itemTO.description;
        // this.owner = new User(itemTO.owner);

        this.lendings = [];
        if (itemTO.lendings != null) {
            for (const lendTO of itemTO.lendings) {
                this.lendings.push(new Lending(lendTO));
            }
        }
    }


}
