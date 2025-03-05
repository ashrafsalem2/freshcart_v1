import { Component,  computed,  inject, input, Input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranselate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
// @Input() isLogin!:boolean; ===

private readonly _myTranslateService=inject(MyTranslateService)
private readonly _translateService=inject(TranslateService)
private readonly _cartService=inject(CartService)

// to use logout routine we inject auth service
private readonly _auth = inject(AuthService)

// for crat items count
cartItemCount:Signal<number>  = computed(()=> this._cartService.cartCounter()) 
// using signal
isLogin = input<boolean>(true)

ngOnInit(): void {
  // this._cartService.cartCounter.subscribe({
  //   next:(vlaue)=>{
  //     this.cartItemCount = vlaue;
  //   }
  // })
}

logout():void{
  this._auth.logout();
}

// change lang and driections

changeLangNow(lang:string):void{
  this._myTranslateService.changeLang(lang);
  // click again in dropdown to make it disapear
   const ele :HTMLElement =  document.getElementById('dropdownNavbarLink') as HTMLElement
  ele.click();
}

hideOtherLang(lang:string):boolean{
  return this._translateService.currentLang === lang
}

}
