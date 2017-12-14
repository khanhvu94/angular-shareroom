import {Directive, Input, Output} from '@angular/core';

@Directive({selector: 'app-multi-language'})
export class AppMultiLanguage {
    @Input()languageCode : any;
    lag : any;
    constructor() {
        var Currentlag = localStorage.getItem('multi_language');
        if(!Currentlag){
            this.lag = {'name':'Chia sẻ phòng trọ'};
            localStorage.setItem('multi_language', JSON.stringify(this.lag));
        }
    }

    setLanguage(lagcode:string){
        if(lagcode == 'eng'){
            this.lag = {'name':'ShareRoom'};
            localStorage.setItem('multi_language', JSON.stringify(this.lag));
        }else if(lagcode == 'vni'){
            this.lag = {'name':'Chia sẻ phòng trọ'};
            localStorage.setItem('multi_language', JSON.stringify(this.lag));
        }

    }

}