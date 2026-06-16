import { Component , DestroyRef, inject, signal} from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero-service';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  imports: [UpperCasePipe , FormsModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail {

  private heroService = inject(HeroService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);

  hero = signal<IHero>({} as IHero);

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((hero) => {
      this.hero.set(hero)
    })
  }

  updateHero(hero: IHero): void{
    if(hero){
      this.heroService.updateHero(hero)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.goBack();
      })
    }
  }

  goBack(): void{
    this.location.back();
  }
}
