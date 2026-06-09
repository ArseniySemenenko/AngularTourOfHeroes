import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';

import { HeroService } from '../../services/hero-service';
import { IHero } from '../../models';

import { Observable, Subject } from 'rxjs';
import { debounceTime , distinctUntilChanged , switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink , AsyncPipe],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css',
})
export class HeroSearch {
  private heroService = inject(HeroService);
  private searchTerms = new Subject<string>();

  heroes$!: Observable<IHero[]>;

  searchHero(name: string): void{
    this.searchTerms.next(name);
  }

  ngOnInit(): void{
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.heroService.searchHeroes(name)),
    )
  }
  
}
