import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfile} from "../../../interfaces/user-profile";
import {ChatService} from "../../../services/chat.service";
import {ChatMessage} from "../../../interfaces/chatMessage";
import {IonContent} from "@ionic/angular";


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  destinataryUser!: UserProfile;
  messages!: ChatMessage[];
  @ViewChild('messageInput', {static: false}) messageInput!: HTMLInputElement;
  @ViewChild('messageList', {static: false}) messageList!: IonContent;
  @ViewChild(IonContent, {static: false}) content!: IonContent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.extras?.state) {
        this.destinataryUser = currentNavigation.extras.state['user'];
        this.getAllMessages()
        this.scrollDownView()
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollDownView()
    }, 300);
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(this.destinataryUser, message);
    this.clearInputValue(this.messageInput);
    this.scrollDownView()
  }

  scrollDownView() {
    if (this.messageList) {
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 10);
    }
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
