import { Injectable } from '@angular/core';
import { Job } from "../model/job";

@Injectable()
export class DataServiceService {
  public jobToEdit: Job;
  constructor() { }

}
