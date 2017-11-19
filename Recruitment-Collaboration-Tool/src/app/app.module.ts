import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
<<<<<<< HEAD
=======
// import { Ng2CarouselamosModule } from 'ng2-carouselamos';
>>>>>>> 364cfef805bf8b6ec5467fadc8e124f899b80169

import { NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { HomeComponent } from './components/home/home.component';
import { AddNewApplicantComponent } from './components/add-new-applicant/add-new-applicant.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewJobComponent } from './components/add-new-job/add-new-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Services
import { LoginServiceService } from "./services/login-service.service";
import { JobsServiceService } from "./services/jobs-service.service";
import { ApplicantServiceService } from "./services/applicant-service.service";
import { DataServiceService } from "./services/data-service.service";
import { SkillsetServiceService } from "./services/skillset-service.service";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UploadFileService } from './services/upload-file.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from "angularfire2/auth";
import { ApplicantDetailComponent } from './components/applicant-detail/applicant-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { FilterPipe } from './filters-pipes/filter-jobs.pipe';

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
    EditJobComponent,
    ApplicantDetailComponent,
    SideNavbarComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Recruitment-Collaboration'),
    AngularFirestoreModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    NgxPaginationModule
  ],
  providers: [
    LoginServiceService,
    JobsServiceService,
    ApplicantServiceService,
    SkillsetServiceService,
    DataServiceService,
    AngularFireDatabase,
    AngularFireAuth,
    UploadFileService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
