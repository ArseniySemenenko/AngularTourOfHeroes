import { Component, inject } from '@angular/core';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from "@angular/router";
import { HeroSearch } from "../hero-search/hero-search";
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HeroSearch , AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private heroService = inject(HeroService);

  heroes$ = this.heroService.getHeroes()
    .pipe(
      map(heroes => heroes.slice(1,5))
    )
}
