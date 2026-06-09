import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IHero } from '../../models';
import { HeroService } from '../../services/hero-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private heroService = inject(HeroService);
  private cdr = inject(ChangeDetectorRef);

  heroes: IHero[] = [];
  isLoading = true;

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe((heroes) => {
      this.heroes = heroes.slice(1,5);
      this.cdr.markForCheck();
      this.isLoading = false;
    });
  }
  
}
