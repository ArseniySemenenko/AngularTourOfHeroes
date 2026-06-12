import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';

import { HeroService } from '../../services/hero-service';
import { IHero } from '../../models';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime , distinctUntilChanged , switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink , AsyncPipe],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css',
})
export class HeroSearch {
  private heroService = inject(HeroService);

  heroes$ = new BehaviorSubject<IHero[]>([]);

  searchHero(name: string): void{
    this.heroService.searchHeroes(name).pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe((heroes)=>{
      this.heroes$.next(heroes);
    })
  }
  
}
