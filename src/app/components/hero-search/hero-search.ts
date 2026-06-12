import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';

import { HeroService } from '../../services/hero-service';
import { IHero } from '../../models';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime , distinctUntilChanged , switchMap , Subject} from 'rxjs';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink , AsyncPipe],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css',
})
export class HeroSearch {
  private heroService = inject(HeroService);
  private searchTerm$ = new Subject<string>();

  heroes$!: Observable<IHero[]>;

  ngOnInit(): void{
    this.heroes$ = this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.heroService.searchHeroes(name))
    )
  }

  searchHero(name: string): void{
    this.searchTerm$.next(name);
  }
  
}
