import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApplicantService } from "../../services/applicant-service.service";
import { Applicant } from "../../model/Applicant";
import { JobsServiceService } from "../../services/jobs-service.service";
import { Skillset } from '../../model/skillset';
import { UploadFileService } from '../../services/upload-file.service';
import { Upload } from '../../model/upload';
import * as _ from "lodash";
import * as firebase from 'firebase';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'add-new-applicant',
  templateUrl: './add-new-applicant.component.html',
  styleUrls: ['./add-new-applicant.component.css']
})
export class AddNewApplicantComponent implements OnInit {
  newApplicant: Applicant = <Applicant>{};
  applicantCvId: number;

  arSkillSetPicked: string[] = [];
  arSkillset: any;
  newArSkillSet: Skillset[] = [];
  selectedFiles: FileList;
  currentUpload: Upload;
  arAllApplicants: Applicant[] = [];
  subscriptionApplicants: any;

  constructor(
    public applicantService: ApplicantService,
    public jobService: JobsServiceService,
    public dataService: DataServiceService,
    private upSvc: UploadFileService) {

  }
  ngOnInit() {
    this.arSkillset = this.dataService.arSkillset;
    this.arSkillset.forEach(element => {
      const skil = { name: element, selected: false };
      this.newArSkillSet.push(skil);
    });
    console.log(this.newArSkillSet);
  }

  ngOnDestroy() {
    this.subscriptionApplicants.unsubscribe();
  }

  skillSetArray(skill) {
    if (skill.selected) {
      this.arSkillSetPicked.push(skill.name)
    }
    if (!skill.selected) {
      console.log(skill)
      let aa = this.arSkillSetPicked.indexOf(skill.name);
      this.arSkillSetPicked.splice(aa, 1)
    }
    console.log(this.arSkillSetPicked)
  }
  addApplicant(formAddApplicant) {
    this.uploadSingle();
    const newApplicant = {
      FirstName: this.newApplicant.FirstName,
      LastName: this.newApplicant.LastName,
      Experience: this.newApplicant.Experience,
      City: this.newApplicant.City,
      Email: this.newApplicant.Email,
      PhoneNumber: this.newApplicant.Phone,
      Age: this.newApplicant.Age,
      Gender: this.newApplicant.Gender,
      CvId:this.applicantCvId,
      Position: this.newApplicant.Position,
      Skills: this.arSkillSetPicked,
    }
    console.log(newApplicant);;
    this.applicantService.addNewApplicant(newApplicant);
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.currentUpload.name = this.randomOfCvIdNumber().toString();
    this.upSvc.pushUpload(this.currentUpload);
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  randomOfCvIdNumber() {
    let exists;
    do {
      this.applicantCvId = Math.floor(Math.random() * 1000000000) + 1;
      exists = this.CheckIfCvIdNumberExists(this.applicantCvId);
    }
    while (exists);

    return this.applicantCvId;
  }

  CheckIfCvIdNumberExists(CvId): boolean {
    let exists = false;
    this.subscriptionApplicants = this.applicantService.getApplicants().subscribe(applicant => {
      this.arAllApplicants = applicant;
      this.arAllApplicants.forEach(applicant => {
        if (applicant.CvId == CvId) {
          exists = true;
        }
      });
    });
    return exists;
  }


}
