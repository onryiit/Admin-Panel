import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { environment } from "../../../environment/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "any",
})
export class NoteService {
    routeParams: any;
    noteList: any[] = [];
    onNoteChanged: BehaviorSubject<any> = new BehaviorSubject({});
    currentUser:any;
    currentUserData: any = null;
    storedUser:any
    constructor(private httpClient: HttpClient) {



    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {}

    getNotesList(): Promise<any> {
      this.storedUser = localStorage.getItem("currentUserAdminPanel");
      this.currentUserData = JSON.parse(this.storedUser)
      const customer_id = this.currentUserData.customer_id
        return new Promise((resolve, reject) => {
            this.httpClient.get(`${environment.apiEndpoint}Note/note-list?customer_id=${customer_id}`).subscribe((response: any) => {
                this.noteList = response.data;
                this.onNoteChanged.next(this.noteList);
                resolve(response);
            }, reject);
        });
    }
    getNoteById(id: number) {
      const customer_id = this.currentUserData.customer_id
        return new Promise((resolve, reject) => {
            this.httpClient.get(`${environment.apiEndpoint}Note/note/?customer_id=${customer_id}&id=${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    saveNote(data: any): Promise<any> {
      this.storedUser = localStorage.getItem("currentUserAdminPanel");
      this.currentUserData = JSON.parse(this.storedUser)
      const customer_id = this.currentUserData.customer_id
        const newNotes= {
          title:data.title,
          content:data.desc,
          customer_id:customer_id
        };
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.apiEndpoint + "Note/save-note", newNotes).subscribe((response: any) => {
                setTimeout(() => this.getNotesList(), 2000); //  2 Second
                resolve(response);
            }, reject);
        });
    }
    deleteNote(id: any): Promise<any> {
      this.storedUser = localStorage.getItem("currentUserAdminPanel");
      this.currentUserData = JSON.parse(this.storedUser)
      const customer_id = this.currentUserData.customer_id
        return new Promise((resolve, reject) => {
            this.httpClient.delete(`${environment.apiEndpoint}Note/note/?customer_id=${customer_id}&id=${id}`).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    UpdateNote(id: number, data: any): Promise<any> {
      const updatedNotes= {
        title:data.title,
        content:data.desc
      };
        return new Promise((resolve, reject) => {
          this.storedUser = localStorage.getItem("currentUserAdminPanel");
          this.currentUserData = JSON.parse(this.storedUser)
          const customer_id = this.currentUserData.customer_id
            this.httpClient
                .put(`${environment.apiEndpoint}Note/note/?customer_id=${customer_id}&id=${id}`, updatedNotes)
                .subscribe((response: any) => {
                    this.getNotesList();
                    resolve(response);
                }, reject);
        });
    }
}
