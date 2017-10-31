import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { HomeComponent } from './components/home/home.component';
import { AddNewApplicantComponent } from './components/add-new-applicant/add-new-applicant.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewJobComponent } from './components/add-new-job/add-new-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    JobsComponent,
    ApplicantComponent,
    HomeComponent,
    AddNewApplicantComponent,
    LoginComponent,
    AddNewJobComponent,
    EditJobComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
