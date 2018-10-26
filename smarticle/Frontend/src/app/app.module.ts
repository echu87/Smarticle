import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SettingsComponent } from './settings/settings.component';
import { ArticlesBySourceComponent } from './articles-by-source/articles-by-source.component';
import { ArticlesByStoryComponent } from './articles-by-story/articles-by-story.component';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LandingPageComponent,
    AboutComponent,
    ContactComponent,
    SettingsComponent,
    ArticlesBySourceComponent,
    ArticlesByStoryComponent,
    UserFeedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
