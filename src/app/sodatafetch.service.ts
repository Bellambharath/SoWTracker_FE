import { Injectable } from '@angular/core';
import { AccountService } from 'src/app/shared/Services/AccountService/account.service';
import { TechnologyService } from 'src/app/shared/Services/TechnologyService/technology.service';
import { RecruiterService } from 'src/app/shared/Services/RecruiterService/recruiter.service';
import { UstPocService } from 'src/app/shared/Services/UstpocService/ust-poc.service';
import { DellManagerService } from 'src/app/shared/Services/DellManagerService/dell-manager.service';
import { StatusService } from 'src/app/shared/Services/StatusService/status.service';
import { RegionService } from 'src/app/shared/Services/RegionService/region.service';
import { LocationService } from 'src/app/shared/Services/LocationService/location.service';
import { UstTpmService } from 'src/app/shared/Services/UsttpmService/ust-tpm.service';
import { CandidateMappingService } from 'src/app/shared/Services/CandidateMappingService/candidate-mapping.service';
import { AccountModel } from 'src/app/Models/AccountModel';
import { TechnologyModel } from 'src/app/Models/TechnologyModel';
import { RecruiterModel } from 'src/app/Models/RecruiterModel';
import { USTPOCModel } from 'src/app/Models/USTPOCModel';
import { DellManagerModel } from 'src/app/Models/DellManagerModel';
import { StatusModel } from 'src/app/Models/StatusModel';
import { RegionModel } from 'src/app/Models/RegionModel';
import { LocationModel } from 'src/app/Models/LocationModel';
import { USTTPMModel } from 'src/app/Models/USTTPMModel';
import { MappingModel } from 'src/app/Models/MappingModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SodatafetchService {

  constructor( private accountService: AccountService,
    private technologyService: TechnologyService,
    private recruiterService: RecruiterService,
    private ustPocService: UstPocService,
    private dellManagerService: DellManagerService,
    private statusService: StatusService,
    private regionService: RegionService,
    private locationService: LocationService,
    private ustTpmService: UstTpmService,
    private mappingService: CandidateMappingService
    ) { }
    getAccountData(): Observable<AccountModel[]> {
      return this.accountService.GetAllAccountData();
    }

    getTechnologyData(): Observable<TechnologyModel[]> {
      return this.technologyService.GetAllTechData();
    }

    getRecruiterData(): Observable<RecruiterModel[]> {
      return this.recruiterService.GetAllRecruiterData();
    }

    getUstPocData(): Observable<USTPOCModel[]> {
      return this.ustPocService.GetAllUstPocData();
    }
    getDellManagerData(): Observable<DellManagerModel[]> {
      return this.dellManagerService.GetAllDellManagerData();
    }

    getStatusData(): Observable<StatusModel[]> {
      return this.statusService.GetAllStatusData();
    }

    getRegionData(): Observable<RegionModel[]> {
      return this.regionService.GetAllRegionData();
    }

    getLocationData(): Observable<LocationModel[]> {
      return this.locationService.GetAllLocationData();
    }

    getUstTpmData(): Observable<USTTPMModel[]> {
      return this.ustTpmService.GetAllUSTTPMData();
    }

    getCandidateMappingData(): Observable<MappingModel[]> {
      return this.mappingService.GetAllCandidateMappingData();
    }
}

