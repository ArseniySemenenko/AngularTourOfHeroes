import { Component } from '@angular/core';
import { IHero } from '../../models';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, Subject, switchMap, startWith} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-heroes-list',
  imports: [FormsModule, RouterLink , AsyncPipe],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  private heroService = inject(HeroService);
  private updateTrigger$ = new Subject<void>();

  heroes$: Observable<IHero[]> = this.updateTrigger$.pipe(
    startWith(void 0),
    switchMap(() => this.heroService.getHeroes())
  )

  ngOnInit(): void {
    this.updateTrigger$.next();
  }

  addHero(name: string): void {
    /*name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as IHero).subscribe((hero) => {
      this.heroes.push(hero);
      this.cdr.markForCheck();
    });*/
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as IHero).subscribe({
      next: () => {
        this.updateTrigger$.next();
      }
    });
  }

  deleteHero(hero: IHero): void {
    /*this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.cdr.markForCheck();
    });*/
    this.heroService.deleteHero(hero.id).subscribe({
      next: () => {
        this.updateTrigger$.next();
      }
    })
  }
}
