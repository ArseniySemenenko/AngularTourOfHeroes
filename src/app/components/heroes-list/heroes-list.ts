import { Component } from '@angular/core';
import { IHero } from '../../models';
import { FormsModule } from '@angular/forms';
import { HeroDetail } from "../hero-detail/hero-detail";
import { HeroService } from '../../services/hero-service';
import { MessageService } from '../../services/message-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  imports: [FormsModule, HeroDetail , RouterLink],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ){}

  heroes: IHero[] = [];

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
