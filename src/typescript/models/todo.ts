'use strict';

export default class Todo {
    private _id: number;
    private _label: string; //par défaut les attributs sont 'public'
    private _isDone: boolean;

    //constructeur
    constructor(id: number, label: string, isDone: boolean = false){
        this._id = id;
        this._label = label;
        this._isDone = isDone;
    }

    //getter standart par défaut public, indtroduit en JS classique depuis ES2015
    get id(): number{
        return this._id;
    }

    //setter standart par défaut public, indtroduit en JS classique depuis ES2015
    set isDone(isDone: boolean){
        this._isDone = isDone;
    }

    //getter standart par défaut public, indtroduit en JS classique depuis ES2015
    get isDone(): boolean{
        return this._isDone;
    }

    //setter standart par défaut public, indtroduit en JS classique depuis ES2015
    set label(label: string){
        this._label = label;
    }

    //getter standart par défaut public, indtroduit en JS classique depuis ES2015
    get label(): string{
        return this._label;
    }

    //cette méthode définie le format JSON d'un Todo
    toJSON(): any{
        return {
            id: this._id,
            label: this._label,
            isDone: this._isDone,
        }
    }
}