import { Component } from '@angular/core';
import {LanguageService} from "./services/language.service";
import {UpdatePWAService} from "./services/update-pwa.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private languageService:LanguageService,
              private pwaUpdate:UpdatePWAService) {
    this.languageService.initLanguage()
  }

}
