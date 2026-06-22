import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { IHero } from '../../models';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';


@Component({
  selector: 'app-heroes-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList implements OnInit{
  private readonly heroService = inject(HeroService);
  
  heroes = signal<IHero[]>([]);

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe({
        next: (heroes) => {
          this.heroes.set(heroes);
        }
      })
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as IHero)
      .subscribe({
        next: (newHero) => {
          this.heroes.update(heroes => [...heroes, newHero]);
        }
    });
  }

  deleteHero(hero: IHero): void {
    this.heroService.deleteHero(hero.id)
      .subscribe({
        next: () => {
          this.heroes.update(heroes => heroes.filter(h => h.id != hero.id));
        }
      })
  }
}
