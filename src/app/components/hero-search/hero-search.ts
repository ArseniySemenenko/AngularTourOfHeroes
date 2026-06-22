import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HeroService } from '../../services/hero-service';
import { signal } from '@angular/core';
import { debounceTime , distinctUntilChanged , switchMap} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css',
})
export class HeroSearch {
  private readonly heroService = inject(HeroService);
  searchTerm = signal<string>("");

  heroes = toSignal(
    toObservable(this.searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(name => this.heroService.searchHeroes(name))
      )
  )
}
