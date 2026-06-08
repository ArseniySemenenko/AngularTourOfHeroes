import { Injectable } from "@angular/core";
import { IHero } from "../models";
import { HEROES } from "../mock";

@Injectable({
    providedIn: "root",
})
export class HeroService{
    constructor(){}

    getHeroes(): IHero[] {
        return HEROES;
    }
}