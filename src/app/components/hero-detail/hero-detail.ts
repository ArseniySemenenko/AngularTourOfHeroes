import { Component , Input} from '@angular/core';
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
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
  ){}

  hero?: IHero;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

}
