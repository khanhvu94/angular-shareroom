import {Directive, Input, Output} from '@angular/core';
import { Security } from './security';

export class Authentication {
    security : any;
    constructor() {
    }

    ngOnInit(){
        this.security = new Security();
    }

    isAuthen() : Boolean{
        let name = localStorage.getItem('access_name');
        let tokent = localStorage.getItem('access_token');
        if(name && tokent){
            return true;
        }
        return false;
    }

    setAuthen(person:any) : Boolean{
        if (typeof (Storage) !== "undefined") {
        localStorage.setItem('access_token', person.token);
        localStorage.setItem('access_name',person.first_name);
        localStorage.setItem('access_role',person.user_type);
        return true;
        }
        return false;
    }

    getAuthen() :any{
        let person : any;
        person.access_name = localStorage.getItem('access_name');
        person.access_role = localStorage.getItem('access_role');
        return person;
    }

    deleteAuthen(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_name');
        localStorage.removeItem('access_role');
    }

    Authen_Router(){
        if(this.isAuthen()){}
    }
}