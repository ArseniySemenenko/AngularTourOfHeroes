import { Component , DestroyRef, inject} from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero-service';
import { Location } from '@angular/common';
import { BehaviorSubject} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  imports: [UpperCasePipe , FormsModule , AsyncPipe],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail {

  private heroService = inject(HeroService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);

  hero$ = new BehaviorSubject<IHero>({} as IHero);

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((hero) => {
      this.hero$.next(hero);
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
