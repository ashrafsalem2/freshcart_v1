import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { TranslatePipe } from '@ngx-translate/core';

// alt +shift + o ===> to delete non used imports ---> that cause latency in page when first load
// we use here leazy loading at routing , to load just the wanted page
export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'', component:AuthComponent, canActivate:[loggedGuard], children:[
        {path:'login', loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent), title:"Login"},
        {path:'register', loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent), title:'Register'},
        {path:'forgetPassword', loadComponent:()=>import('./layouts/additions/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent),title:'Forget password Page'},
        {path:'resetCode', loadComponent:()=>import('./layouts/additions/reset-code/reset-code.component').then((c)=>c.ResetCodeComponent),title:'Reset Code Page'},
        {path:'renewPass', loadComponent:()=>import('./layouts/additions/get-new-password/get-new-password.component').then((c)=>c.GetNewPasswordComponent), title:'set your new'},
        {path:'renew', loadComponent:()=>import('./layouts/additions/renew/renew.component').then((c)=>c.RenewComponent), title:'set your new'},
    ]},
    {path:'', component:BlankComponent, children:[
        {path:'home', loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent),canActivate:[authGuard], title:"home"},
        {path:'category', loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title:"Category"},
        {path:'brand', loadComponent:()=>import('./pages/brands/brands.component').then((c)=>BrandsComponent), title:"Brand"},
        {path:'products', loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent), title:"Products"},
        {path:'details/:id', loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent), title:"details page"},
        {path:'cart', loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent), title:"Cart"},
        {path:'checkout/:id', loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title:"Checkout"},
        {path:'allorders', loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent), title:"All Orders"},
        {path:'**', loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent), title:"Not Found Page"}
    ]},
];
