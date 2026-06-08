import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { HeroesList } from "./components/heroes-list/heroes-list";
import { HeroDetail } from "./components/hero-detail/hero-detail";
import { Messages } from "./components/messages/messages";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroesList, HeroDetail, Messages, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title="Tour of Heroes";
}
