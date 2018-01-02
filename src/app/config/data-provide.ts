import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Subject } from "rxjs/Subject";
import * as config from "../config/globals";
import { Response, RequestOptions, Headers } from "@angular/http";


export class DataProvide {

    constructor(
      public http: Http
    ) {
    }

    post(url:string,objects:any) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = JSON.stringify(objects);
        return this.http.post(config.BASE_URL_API+url, body , { headers: headers })
          .map((res: Response) => {
            if(res.status == 200){
              return res.json();
            }
          });
      }

      put(url:string,objects:any) : Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
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
        return this.http.get(config.BASE_URL_API+url , { headers: headers })
          .map((res: Response) => {
            if(res.status == 200){
              return res.json();
            }
          });
      }
}