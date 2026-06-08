import { Component } from '@angular/core';
import { MessageService } from '../../services/message-service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  constructor(
    public messageService: MessageService,
  ){}
}
