import { Component, inject } from '@angular/core';
import { IHero } from '../../models';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from "@angular/router";
import { HeroSearch } from "../hero-search/hero-search";
import { Observable, Subject, switchMap , map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HeroSearch , AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private heroService = inject(HeroService);
  private updateTrigger$ = new Subject<void>();

  heroes$: Observable<IHero[]> = this.updateTrigger$.pipe(
    startWith(void 0),
    switchMap(() => this.heroService.getHeroes()),
    map(arr => arr.slice(1,5))
  )

  ngOnInit(): void{
    this.updateTrigger$.next();
  }
}
