import { Injectable } from "@angular/core";
import { IHero } from "../models";
import { MessageService } from "./message-service";
import { Observable , of } from 'rxjs';
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
        this.log("fetched heroes");
        return this.http.get<IHero[]>(this.heroesUrl);
    }

    getHero(id: number): Observable<IHero>{
        this.log("fetched single hero");
        return this.http.get<IHero>(`${this.heroesUrl}/${id}`);
    }

    updateHero(hero: IHero): Observable<any> {
        this.log(`Updated hero ${hero.id}`);
        return this.http.put(this.heroesUrl , hero , this.httpOptions);
    }

    addHero(hero: IHero): Observable<IHero>{
        this.log(`Added hero ${hero.name}`);
        return this.http.post<IHero>(this.heroesUrl , hero , this.httpOptions);
    }

    deleteHero(id: number): Observable<IHero>{
        this.log(`Deleted hero ${id}`);
        return this.http.delete<IHero>(`${this.heroesUrl}/${id}` , this.httpOptions);
    }

    searchHeroes(name: string): Observable<IHero[]>{
        if(!name.trim()){
            return of([]);
        }
        this.log(`Searching for ${name}`);
        return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${name}`);
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}