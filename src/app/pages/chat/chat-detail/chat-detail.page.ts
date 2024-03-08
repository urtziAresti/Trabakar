import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {UserProfile} from "../../../interfaces/user-profile";
import {ChatService} from "../../../services/chat.service";
import {ChatMessage} from "../../../interfaces/chatMessage";


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  destinataryUser!: UserProfile;
  messages!: ChatMessage[];
  @ViewChild('messageInput', {static: false}) messageInput!: HTMLInputElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.extras?.state) {
        this.destinataryUser = currentNavigation.extras.state['user'];
        this.getAllMessages()
      }
    });
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(this.destinataryUser, message);
    this.clearInputValue(this.messageInput);

  }


  clearInputValue(input: HTMLInputElement) {
    input.value = ''; // Clear the input value
  }

  getAllMessages() {
    this.chatService.getMessage(this.destinataryUser).subscribe(conversationMessages => {
      this.messages = conversationMessages.sort((a, b) => {
        return a.message_timestamp.getTime() - b.message_timestamp.getTime();
      });
    })
  }

}
