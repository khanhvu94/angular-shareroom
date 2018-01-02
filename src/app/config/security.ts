// import {Directive, Input, Output} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Md5 } from 'ts-md5/dist/md5';
import {Buffer} from 'buffer';

export class Security {
    secret_key = "timphongtro";
    constructor() {}

    ngOnInit(){
    }

    enCrypt(plaintext:string): string   {
        if (!plaintext)
        {
            return "";
        }
        let rs = CryptoJS.AES.encrypt(plaintext, this.secret_key).toString();
        let buffer = new Buffer(rs);
        return buffer.toString('base64');
    };
    deCrypt(ciphertext:string): string {
        if (!ciphertext)
        {
            return "";
        }
        let buffer = new Buffer(ciphertext, 'base64');
        let bytes = CryptoJS.AES.decrypt(buffer.toString(), this.secret_key);
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    enMd5(plaintext:string):string{
        if (!plaintext)
        {
            return "";
        }
        let text = Md5.hashStr("password");
        return text.toString();
    }
}