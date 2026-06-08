import { Component } from '@angular/core';
import { IHero } from '../../models';
import { HeroService } from '../../services/hero-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private heroService: HeroService,
  ){}

  heroes: IHero[] = [];

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1,5));
  }
  
}
