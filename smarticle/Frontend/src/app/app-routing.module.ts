import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components that require routing
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SettingsComponent } from './settings/settings.component';
import { ArticlesBySourceComponent } from './articles-by-source/articles-by-source.component';
import { ArticlesByStoryComponent } from './articles-by-story/articles-by-story.component';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { LoginComponent } from './login/login.component';

// stores the required routes, these routes are split up into two properties;
// path: a string that matches the URL in the browser address bar, component: the component that the router should use when navigating to this route
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'articles-by-source', component: ArticlesBySourceComponent },
  { path: 'articles-by-story', component: ArticlesByStoryComponent },
  { path: 'user-feed', component: UserFeedComponent },
  { path: 'login', component: LoginComponent },
  // redirects the user to the landing page if they type in an invalid URL
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  // RouterModule.forRoot(routes) initializes the routes with the specified routes
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
