import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ContentComponent } from './shared/components/content/content.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormLoginComponent } from './shared/components/form-login/form-login.component';

import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  {
    path: ''
    , component: AppComponent /* inclue navbar e footer*/
    , children: [
          { path: 'login', component: LoginComponent }
        , { path: 'home', component: HomeComponent }
        , { path: '', component: HomeComponent }
      ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContentComponent,
    FooterComponent,
    FormLoginComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
    , HttpClientModule
    , BrowserModule
    , AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
