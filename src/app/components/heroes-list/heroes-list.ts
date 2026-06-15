import { Component, DestroyRef } from '@angular/core';
import { IHero } from '../../models';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-heroes-list',
  imports: [FormsModule, RouterLink, AsyncPipe],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  private heroService = inject(HeroService);
  private destroyRef = inject(DestroyRef);
  
  heroes$ = new BehaviorSubject<IHero[]>([]);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (heroes) => {
          this.heroes$.next(heroes)
        }
      })
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as IHero)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (newHero) => {
          const current$ = this.heroes$.value;
          this.heroes$.next([...current$, newHero]);
        }
      });
  }

  deleteHero(hero: IHero): void {
    this.heroService.deleteHero(hero.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const current$ = this.heroes$;
          this.heroes$.next(current$.value.filter(h => h.id != hero.id));
        }
      })
  }
}
