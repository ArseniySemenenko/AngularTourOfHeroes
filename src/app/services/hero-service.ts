import { ChangeDetectorRef, Injectable } from "@angular/core";
import { IHero } from "../models";
import { HEROES } from "../mock";
import { MessageService } from "./message-service";
import { Observable, of , tap } from 'rxjs';
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

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }


    /*getHero(id: number): Observable<IHero> {
        const hero = HEROES.find(h => h.id === id)!;
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(hero);
    }

    getHeroes(): Observable<IHero[]> {
        const heroes = of(HEROES);
        this.messageService.add('HeroService: fetched heroes');
        return heroes;
    }*/

    
}