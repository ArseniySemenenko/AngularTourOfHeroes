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

    getHeroes(): Observable<IHero[]> {
        const heroes = of(HEROES);
        this.messageService.add('HeroService: fetched heroes');
        return heroes;
    }
}