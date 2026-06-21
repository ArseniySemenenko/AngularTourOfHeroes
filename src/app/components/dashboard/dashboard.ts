import { Component, DestroyRef, inject } from '@angular/core';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from "@angular/router";
import { HeroSearch } from "../hero-search/hero-search";
import { map } from 'rxjs';
import { signal } from '@angular/core';
import { IHero } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HeroSearch],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly heroService = inject(HeroService);
  private readonly destroyRef = inject(DestroyRef);

  heroes = signal<IHero[]>([]);
 
  ngOnInit() {
    this.heroService.getHeroes()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(heroes => heroes.slice(1, 5))
      )
      .subscribe(
        heroes => this.heroes.set(heroes)
      )
  }
}
