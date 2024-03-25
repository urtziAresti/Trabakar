import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfile} from "../../../interfaces/user-profile";
import {ChatService} from "../../../services/chat.service";
import {ChatMessage} from "../../../interfaces/chatMessage";
import {IonContent} from "@ionic/angular";
import {Auth} from "@angular/fire/auth";
import {Travel} from "../../../interfaces/travel";


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  destinataryUser!: UserProfile;
  currentUser = this.auth.currentUser;
  travelData?: Travel;


  messages!: ChatMessage[];
  @ViewChild('messageInput', {static: false}) messageInput!: HTMLInputElement;
  @ViewChild('messageList', {static: false}) messageList!: IonContent;
  @ViewChild(IonContent, {static: false}) content!: IonContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private auth: Auth) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {

      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.extras?.state) {
        this.destinataryUser = currentNavigation.extras.state['destinataryUser'];
        this.getAllMessages()
        this.scrollDownView()
      }
      // if (currentNavigation && currentNavigation.extras?.state) {
      //   if (currentNavigation.extras?.state['travelData']) {
      //     this.travelData = currentNavigation.extras?.state['travelData'] as Travel;
      //   }
      // }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollDownView()
    }, 300);
  }

  sendMessage(message: string) {

    this.chatService.sendMessage(this.destinataryUser.id.toString(), message);
    this.clearInputValue(this.messageInput);
    this.scrollDownView()
  }

  acceptReserve(){
    console.warn(this.currentUser)
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
      if (conversationMessages.length == 0) {
        this.sendPresentationMessage()
      }
      this.messages = conversationMessages.sort((a, b) => {
        return a.message_timestamp.getTime() - b.message_timestamp.getTime();
      });
    })
  }

  sendPresentationMessage() {
    this.sendMessage("Hola, me gustaria reservar tu viaje...")
  }

}
