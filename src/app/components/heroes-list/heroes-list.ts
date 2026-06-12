import { Component } from '@angular/core';
import { IHero } from '../../models';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-heroes-list',
  imports: [FormsModule, RouterLink , AsyncPipe],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  private heroService = inject(HeroService);

  heroes$ = new BehaviorSubject<IHero[]>([]);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes$.next(heroes)
      }
    })
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
        this.getHeroes();
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
        this.getHeroes();
      }
    })
  }
}
