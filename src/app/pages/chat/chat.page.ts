import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserProfile} from "../../interfaces/user-profile";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  users: UserProfile[] = [];

  constructor(private chatService: ChatService,
              private router: Router) {
  }

  ngOnInit() {

    // this.chatService.getAllUsers().subscribe((res) => {
    //   this.users = res;
    // })
  }

  openUserChat(user: UserProfile) {

    const navigationExtras: NavigationExtras = {
      state: {
        originaryser: user
      }
    };
    this.router.navigateByUrl('home/chat/chat-detail', navigationExtras);
  }

}
