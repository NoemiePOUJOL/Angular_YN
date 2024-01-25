import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import{MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AssignmentsComponent } from './assignments/assignments.component';
import {RenduDirective} from './shared/rendu.directive';
import { FormsModule} from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import {AuthGuard} from './shared/auth.guard';

import {RouterModule,Routes} from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AppLoginComponent } from './shared/app-login/app-login.component';
import { AuthService } from './shared/auth.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  //home page, ce qui sera affiché avec http://localhost:4200
  {path:'',component: AddAssignmentComponent},
  // ou http://localhost:4200/home
  {path:'home', component:AssignmentsComponent},
  {path:'add', component: AddAssignmentComponent},
  {path:'assignment/:id', component: AssignmentDetailComponent},
  {path:'assignment/:id/edit', component:EditAssignmentComponent, canActivate : [AuthGuard]},
  {path:'login', component: AppLoginComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AppLoginComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
