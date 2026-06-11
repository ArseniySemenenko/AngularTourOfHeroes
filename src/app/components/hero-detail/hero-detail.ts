import { Component , inject} from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero-service';
import { Location } from '@angular/common';
import { Observable, startWith, Subject, switchMap , map} from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
  private updateTrigger$ = new Subject<void>();

  hero$!: Observable<IHero>;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    /*this.heroService.getHero(id)
    .subscribe((hero) => {
      this.hero = hero
      this.cdr.markForCheck();
    });*/

    this.hero$ = this.updateTrigger$.pipe(
      startWith(void 0),
      switchMap(() => this.heroService.getHero(id)),
    )

    console.log(this.hero$)
  }

  updateHero(hero: IHero): void{
    if(hero){
      this.heroService.updateHero(hero).subscribe({
        next: () => {
          this.goBack()
        }
      })
    }
  }

  goBack(): void{
    this.location.back();
  }
}
