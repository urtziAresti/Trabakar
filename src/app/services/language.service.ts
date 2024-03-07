import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {LocalStorageService, StorageKey} from "./local-storage.service";
import {BehaviorSubject, Observable, shareReplay} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string = environment.defaultLanguage; // Default language

  constructor(private localStorage: LocalStorageService,
              private translate: TranslateService,
  ) {
  }

  public browserLang!: string;
  public defaultLanguage = environment.defaultLanguage;

  private _lang: BehaviorSubject<string> = new BehaviorSubject(this.defaultLanguage);
  public readonly lang$: Observable<string> = this._lang.asObservable().pipe(shareReplay(1));

  private _language!: string;
  public get language(): string {
    // const storedLang = this.storage.get(StorageKey.SELECTED_LANG) || '';
    return this._language || this.defaultLanguage;
  }

  private _locale!: string;
  get locale(): string {
    const storedLocale = this.localStorage.get(StorageKey.SELECTED_LOCALE);
    return this._locale || (storedLocale || this.language);
  }

  set locale(locale: string) {
    this._locale = locale;
    this.localStorage.set(StorageKey.SELECTED_LOCALE, locale); // Store selected locale
  }

  public set language(lang: string) {
    this._language = lang;
    // Store selected language
    this.localStorage.set(StorageKey.SELECTED_LANG, lang);
    // Change index.html lang attr
    document.documentElement.lang = lang;
    // Emit new value to subscriptions
    this._lang.next(lang);
    // Change @ngx-translate language
    this.translate.use(this.language);
  }


  public initLanguage() {
    this.translate.addLangs(environment.availableLanguages);
    this.translate.defaultLang = this.defaultLanguage;
    // Get Browser default language, as fallback
    this.browserLang = this.translate.getBrowserLang()!;
    // Get stored language
    const storedLang = this.localStorage.get(StorageKey.SELECTED_LANG);
    const selectedLang = storedLang || this.browserLang;
    // Set stored lang or browser lang as fallback
    // If any of them is one of accepted langs, use default lang
    this.language = this.isAcceptedLang(selectedLang) ? selectedLang : this.translate.defaultLang;
  }

  public changeLanguage(lang: string) {

    debugger
    if (!this.isAcceptedLang(lang)) {
      return false;
    }
    this.language = lang;
    this.translate.use(lang).subscribe();
    this.localStorage.set(StorageKey.SELECTED_LANG, lang);
    this.changeLocale(lang);
    return true;
  }


  public changeLanguageAndLocale(lang: string) {
    if (!this.isAcceptedLang(lang)) {
      return false;
    }
    this.language = lang;
    this.translate.use(lang); // Change translations language
    this.localStorage.set(StorageKey.SELECTED_LANG, lang);
    this.changeLocale(lang);

    return true;
  }

  /** Changes the app LOCALE and register new Culture */
  public changeLocale(locale: string) {
    this.locale = locale;
    // Store selected locale
    this.localStorage.set(StorageKey.SELECTED_LOCALE, locale);
  }


  public registerLocale() {
    this.localStorage.set(StorageKey.SELECTED_LOCALE, this.locale);
    return this.locale;
  }

  private isAcceptedLang(lang: string) {
    return this.translate.getLangs().includes(lang);
  }
}
