import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HeroService } from '../../services/hero-service';
import { signal } from '@angular/core';
import { debounceTime , distinctUntilChanged , switchMap} from 'rxjs';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css',
})
export class HeroSearch {
  private heroService = inject(HeroService);
  private destroyRef = inject(DestroyRef);
  searchTerm = signal<string>("");

  heroes = toSignal(
    toObservable(this.searchTerm)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(name => this.heroService.searchHeroes(name))
      )
  )
}
