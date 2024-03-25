import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserProfile} from "../../interfaces/user-profile";
import {NavigationExtras, Router} from "@angular/router";
import {Userprofiletravel} from "../../interfaces/userprofiletravel";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  contactedUsers: Userprofiletravel[] = [];

  constructor(private chatService: ChatService,
              private router: Router) {
  }

  ngOnInit() {

    this.chatService.getContactedUsers().subscribe((contactedUsers) => {
      console.error(contactedUsers)
      this.contactedUsers = contactedUsers;
    })
  }

  openUserChat(destinataryuser: UserProfile,index:number) {

    const navigationExtras: NavigationExtras = {

      state: {
        destinataryUser: destinataryuser,
        travelData: this.contactedUsers[index].travelData
      }
    };
    this.router.navigateByUrl('home/chat/chat-detail', navigationExtras);
  }

}
