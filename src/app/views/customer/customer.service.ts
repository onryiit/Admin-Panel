import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { environment } from "../../../environment/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../pages/auth.service";

@Injectable({
    providedIn: "any",
})
export class CustomerService {
    routeParams: any;
    customerList: any[] = [];
    oncustomerChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private httpClient: HttpClient,private authService:AuthService) {}

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {}

    getCustomerList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(`${environment.apiEndpoint}customer`).subscribe((response: any) => {
                this.customerList = response.data;
                this.oncustomerChanged.next(this.customerList);
                resolve(response);
            }, reject);
        });
    }
    getcustomerById(id: number) {
        return new Promise((resolve, reject) => {
            this.httpClient.get(`${environment.apiEndpoint}customer&id=${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    saveCustomer(data: any): Promise<any> {
        const newCustomer= {
          name:data.name,
          status:data.status,
          role:data.role
        };
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.apiEndpoint + "customer", newCustomer).subscribe((response: any) => {
                resolve(response);
                const email = `${data.name}@adminpanel.net`
                const password = "Admin123"

                const payload={
                    email:email,
                    password:password,
                    customer_id:response.id
                }
                this.authService.saveUser(payload)
            }, reject);
        });
    }
    deleteCustomer(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(`${environment.apiEndpoint}customer?id=${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    UpdateCustomer(id: number, data: any): Promise<any> {
      const updatedCustomer= {
        name:data.name,
        status:data.status,
        role:data.role
      };
        return new Promise((resolve, reject) => {
            this.httpClient
                .put(`${environment.apiEndpoint}customer?id=${id}`, updatedCustomer)
                .subscribe((response: any) => {
                    this.getCustomerList();
                    resolve(response);
                }, reject);
        });
    }
}
