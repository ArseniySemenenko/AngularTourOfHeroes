import { ChangeDetectorRef, Component , inject} from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero-service';
import { Location } from '@angular/common';

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
  private cdr = inject(ChangeDetectorRef);

  hero?: IHero;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe((hero) => {
      this.hero = hero
      this.cdr.markForCheck();
    });
  }

  updateHero(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero)
      .subscribe(() => {
        this.goBack();
      })
    }
  }

  goBack(): void{
    this.location.back();
  }
}
