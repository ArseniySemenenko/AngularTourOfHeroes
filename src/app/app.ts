import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Messages } from "./components/messages/messages";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Messages, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title="Tour of Heroes";
}
