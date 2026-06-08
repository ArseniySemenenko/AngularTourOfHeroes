import { Component } from '@angular/core';
import { IHero } from '../../models';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HEROES} from "../../mock";

@Component({
  selector: 'app-heroes-list',
  imports: [UpperCasePipe , FormsModule],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css',
})
export class HeroesList {
  heroes=HEROES;
}
