import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from "../../../environment/environment";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "any",
})
export class AuthService {

    constructor(private httpClient: HttpClient) {}

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {}

    saveUser(data: any): Promise<any> {
        const newUser= {
          email:data.email,
          password:data.password,
          customer_id:data.customer_id
        };
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.apiEndpoint + "reg/register", newUser).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    login(data: any): Promise<any> {
        const user= {
          email:data.email,
          password:data.password
        };
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.apiEndpoint + "auth/login", user).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    userById(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(`${environment.apiEndpoint}user?customer_id=${data.customer_id}&user_id=${data.user_id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }

}
