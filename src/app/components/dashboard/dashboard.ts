import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from "@angular/router";
import { HeroSearch } from "../hero-search/hero-search";
import { map } from 'rxjs';
import { signal } from '@angular/core';
import { IHero } from '../../models';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HeroSearch],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  private readonly heroService = inject(HeroService);

  heroes = signal<IHero[]>([]);
 
  ngOnInit() {
    this.heroService.getHeroes()
      .pipe(
        map(heroes => heroes.slice(0 , 4))
      )
      .subscribe(
        heroes => this.heroes.set(heroes)
      )
  }
}
