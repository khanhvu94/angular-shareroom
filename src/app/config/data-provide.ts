import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Subject } from "rxjs/Subject";
import * as config from "../config/globals";
import { Response, RequestOptions, Headers } from "@angular/http";


export class DataProvide {
    private _token = "";
    constructor(
      public http: Http
    ) {    
      if(localStorage.getItem("access_token")){
        this._token = localStorage.getItem("access_token");
      } 
    }


    post(url:string,objects:any) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token",this._token);
        let body = JSON.stringify(objects);
        return this.http.post(config.BASE_URL_API+url, body , { headers: headers })
          .map((res: Response) => {
            if(res.status == 200){
              return res.json();
            }
          });
      }

      delete(url:string) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token",this._token);
        return this.http.delete(config.BASE_URL_API+url, { headers: headers })
          .map((res: Response) => {
            if(res.status == 200){
              return res.json();
            }
          });
      }

      put(url:string,objects:any) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token",this._token);
        let body = JSON.stringify(objects);
        return this.http.put(config.BASE_URL_API+url, body , { headers: headers })
          .map((res: Response) => {
            if(res.status == 200){
              return res.json();
            }
          });
      }

      get(url:string) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token",this._token);
        return this.http.get(config.BASE_URL_API+url , { headers: headers })
          .map((res: Response) => {
            if(res.status == 200){
              return res.json();
            }
          });
      }

      getJSONFile(url:string) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get(url , { headers: headers })
          .map((res: Response) => {
              return res.json();
          });
      }
}