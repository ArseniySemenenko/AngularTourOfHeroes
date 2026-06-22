import { Component , DestroyRef, inject, OnInit, signal} from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [UpperCasePipe, FormsModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail implements OnInit{

  private readonly heroService = inject(HeroService);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  hero = signal<IHero>({ id: 0, name: ""});
  notFound = signal(false);
  notFoundId = signal("");
  
  ngOnInit(): void {
    this.getHero();
  }

  private getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.heroService.getHero(id)
          .subscribe((hero) => {
            if (hero) {
              this.hero.set(hero);
            }
            else {
              this.notFoundId.set(String(this.route.snapshot.paramMap.get('id')));
              this.notFound.set(true);
            }
          })
    }
    else {
      this.notFoundId.set(String(this.route.snapshot.paramMap.get('id')));
      this.notFound.set(true);
    }
  }

  updateHero(hero: IHero): void{
    this.heroService.updateHero(hero)
      .subscribe(() => {
        this.goBack();
      });
  }

  goBack(): void{
    this.location.back();
  }
}
