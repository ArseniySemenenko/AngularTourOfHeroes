import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesList } from "./components/heroes-list/heroes-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroesList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title="Tour of Heroes";
}
