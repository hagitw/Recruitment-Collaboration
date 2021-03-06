import { Component, OnInit, ViewEncapsulation, Input, Output, Inject } from '@angular/core';
import { Job } from '../../model/job';
import { Applicant } from '../../model/Applicant';
import { Manger } from '../../model/manger';
import { JobsServiceService } from "../../services/jobs-service.service";
import { DataServiceService } from "../../services/data-service.service";
import { Skillset } from '../../model/skillset';
import { ApplicantStatus } from '../../model/applicant-status';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import 'firebase/storage';
import { ApplicantService } from "../../services/applicant-service.service";
import { ApplicantStatusService } from '../../services/applicant-status.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AngularFireAuth]
})
export class ApplicantDetailComponent implements OnInit {
  applicant: Applicant;
  arSkillset: any;
  newArSkillSet: Skillset[] = [];
  arSkillSetPicked: string[] = [];
  viewWordFile: any;
  passUrl = this.viewWordFile;
  page: number = 1;
  pageurl: SafeResourceUrl;
  getCvOf: any;
  LockUnlock: boolean = false;
  manger: string;
  arApplicantStatus: ApplicantStatus[] = [];
  toggleEditIcon: boolean = false;

  constructor(public jobService: JobsServiceService,
    public DataService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    firebaseApp: FirebaseApp,
    private domSanitizer: DomSanitizer,
    public applicantService: ApplicantService,
    public statusService: ApplicantStatusService,
    private authService: AuthService) {
    this.applicant = DataService.applicantToEdit;
    this.getCvOf = this.applicant.CvId.toString();
    const storageRef = firebaseApp.storage().ref().child('/uploads/' + this.getCvOf);
    storageRef.getDownloadURL().then(url => this.viewWordFile = url);
  }
  ngOnInit() {
    this.pageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.passUrl);
    this.statusService.getApplicantStatus().subscribe(statusDocs => {
      this.arApplicantStatus = statusDocs;
    });
    if (this.authService.isUserAdmin()) {
      this.toggleEditIcon = true;
    }
  }

  downloadCV() {
    var url = this.viewWordFile;
    open(url);
  }
  lockToggle() {
    if (!this.applicant.IsActive) {
      this.applicant.IsActive = !this.applicant.IsActive;
      this.applicantService.updeteApplicants(this.applicant);
      this.manger = 'weretawt5@gmail.com';
      let newApplicantStatus: ApplicantStatus = { ApplicantId: this.applicant.Id, MangerId: this.auth.auth.currentUser.uid };
      this.statusService.lockApplicant(newApplicantStatus);
    }
    else {
      this.applicant.IsActive = !this.applicant.IsActive;
      this.applicantService.updeteApplicants(this.applicant);
      this.statusService.deleteApplicantsStatus(this.getStatusId(this.applicant));
    }
  }
  getStatusId(applicant): string {
    let getId: string;
    this.arApplicantStatus.forEach(element => {
      if (applicant.Id == element.ApplicantId) {
        getId = element.Id;
      }
    });
    return getId;
  }

  goToEditApplicant(applicant) {
    if (this.authService.isUserAdmin()) {
      this.DataService.applicantToEdit = applicant;
      this.router.navigate(['./edit-applicant'])
    }
  }
}
