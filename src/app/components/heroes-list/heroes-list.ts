import { ChangeDetectorRef, Component } from '@angular/core';
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
export class HeroesList {

  private heroService = inject(HeroService);
  private cdr = inject(ChangeDetectorRef);

  heroes: IHero[] = [];
  isLoading = true;

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe((heroes) => {
      this.heroes = heroes;
      this.cdr.markForCheck();
      this.isLoading = false;
    });
  }

  addHero(name: string): void{
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as IHero)
    .subscribe((hero) => {
      this.heroes.push(hero);
      this.cdr.markForCheck();
    });
  }

  deleteHero(hero: IHero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id)
    .subscribe(() => {
      this.cdr.markForCheck();
    });
  }
}
