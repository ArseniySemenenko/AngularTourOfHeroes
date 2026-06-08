import { Component } from '@angular/core';
import { IHero } from '../../models';
import { FormsModule } from '@angular/forms';
import { HeroDetail } from "../hero-detail/hero-detail";
import { HeroService } from '../../services/hero-service';

@Component({
  selector: 'app-heroes-list',
  imports: [FormsModule, HeroDetail],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  constructor(
    private heroService: HeroService,
  ){}

  heroes: IHero[] = [];
  selectedHero?: IHero;

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroes = this.heroService.getHeroes();
  }

  onSelect(hero: IHero): void{
    this.selectedHero = hero;
  }

}
