import { Component } from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HEROES} from "../../mock";
import { HeroDetail } from "../hero-detail/hero-detail";

@Component({
  selector: 'app-heroes-list',
  imports: [UpperCasePipe, FormsModule, HeroDetail],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  heroes=HEROES;
  selectedHero?: IHero;
  onSelect(hero: IHero): void{
    this.selectedHero = hero;
  }
}
