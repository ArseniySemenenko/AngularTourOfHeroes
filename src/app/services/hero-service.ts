import { Injectable } from "@angular/core";
import { IHero } from "../models";
import { MessageService } from "./message-service";
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class HeroService{
    constructor(
        private messageService: MessageService,
        private http: HttpClient,
    ){}

    private heroesUrl = 'api/heroes';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getHeroes(): Observable<IHero[]>{
        this.log("fetched heroes from hero-service.ts");
        return this.http.get<IHero[]>(this.heroesUrl);
    }

    getHero(id: number): Observable<IHero>{
        this.log("fetched single hero from hero-service.ts");
        return this.http.get<IHero>(`${this.heroesUrl}/${id}`);
    }

    updateHero(hero: IHero): Observable<any> {
        this.log(`Updated hero ${hero.id}`);
        return this.http.put(this.heroesUrl , hero , this.httpOptions);
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}