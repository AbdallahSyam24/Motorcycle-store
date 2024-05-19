import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { Auth } from './auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { AddViewComponent } from './add-view/add-view.component';
import { ModelsListViewComponent } from './models-list-view/models-list-view.component';
import { ModelsAddViewComponent } from './models-add-view/models-add-view.component';
import { ModelsEditViewComponent } from './models-edit-view/models-edit-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    EditViewComponent,
    AddViewComponent,
    ModelsListViewComponent,
    ModelsAddViewComponent,
    ModelsEditViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [Auth],
      },
      {
        path: 'editView/:id',
        component: EditViewComponent,
        canActivate: [Auth],
      },
      {
        path: 'addView',
        component: AddViewComponent,
        canActivate: [Auth],
      },
      {
        path: ':mID/models',
        component: ModelsListViewComponent,
        canActivate: [Auth],
      },
      {
        path: ':mID/models/addView',
        component: ModelsAddViewComponent,
        canActivate: [Auth],
      },
      {
        path: ':mID/models/editView/:id',
        component: ModelsEditViewComponent,
        canActivate: [Auth],
      },
    ]),
    NgbModule,
  ],
  providers: [Auth],
  bootstrap: [AppComponent],
})
export class AppModule {}
