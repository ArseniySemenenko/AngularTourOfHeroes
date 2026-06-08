import { Injectable } from "@angular/core";
import { IHero } from "../models";
import { HEROES } from "../mock";
import { MessageService } from "./message-service";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class HeroService{
    constructor(
        private messageService: MessageService,
    ){}

    getHero(id: number): Observable<IHero> {
        const hero = HEROES.find(h => h.id === id)!;
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(hero);
    }

    getHeroes(): Observable<IHero[]> {
        const heroes = of(HEROES);
        this.messageService.add('HeroService: fetched heroes');
        return heroes;
    }
}