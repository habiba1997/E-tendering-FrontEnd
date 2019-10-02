import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { DataCommunicationService } from 'src/app/Services/data-Comunication.service';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/Services/http-service.service';
import { NavigationService } from 'src/app/Services/navigation.service';

@Component({
  selector: 'app-diathermy-form',
  templateUrl: './diathermy-form.component.html',
  styleUrls: ['../../../app.component.css'],
  providers: [DatePipe]
})
export class DiathermyFormComponent{
  countryOfOrigin:string;
  countriesArray=[];
  polarity:string;
  compatibility:string;
  Alarm:string;
  PowerRange = 300;
  CogPowerRange=60;
  FDA:boolean;
  myDeadDate;

  companiesSelected;
  Date;
Open:boolean;
Direct:boolean;

  constructor(
    private datePipe: DatePipe,
    private data : DataService,
    private dataCom:DataCommunicationService,
    private http:HttpService,
    private navigate:NavigationService
  ) {

      
      let myDate = new Date();

      this.countriesArray=data.countries;  
      this.dataCom.companiesIdObject.subscribe(object => 
        {
          if(!object.companiesId) this.navigate.navigateTo("./tender");
          this.companiesSelected = object.companiesId;
          this.Open = object.open;
          this.Direct = object.direct;
        });    
        this.Date = this.datePipe.transform(myDate, 'yyyy-MM-dd');
   }
print()
{
  console.log(this.countryOfOrigin);    
  console.log(this.polarity);
  console.log(this.compatibility);
  console.log(this.Alarm);
  console.log(this.PowerRange); 
  console.log(this.CogPowerRange);
  console.log(this.FDA);
  console.log(this.Date)
  console.log(this.myDeadDate);
  console.log(this.Open)
  console.log(this.Direct)
  console.log(this.companiesSelected);
}
   Submit() {
     console.log(this.obj());
  // this.http.postTender(this.obj()).subscribe(user => {console.log("token",user);});
  }

  obj()
  {
    return {

      "Issued_Hospital_ID": "5d83ecbe91fed14ee103b3ab",
      "Device_Name": "Diathermy",
      "Device_Data": {	
            "countryOfOrigin":this.countryOfOrigin,
            "polarity":this.polarity,
            "compatibility":this.compatibility,
            "alarm":this.Alarm,
            "powerRange":this.PowerRange,
            "CogPowerRange":this.CogPowerRange,
            "FDACertified":this.FDA
    },
      "startDate": this.Date,
      "deadlineDate": this.myDeadDate,
     "Direct_Process": this.Open,
      "Open_Process": this.Direct,
      "Companies_Selected":this.companiesSelected
    
    
    };
  }




  onPolarityChange(value)
  {
    this.polarity = value
  }
  onCompatibilitychange(value)
  {
    this.compatibility=value;
  }
  onAlarmchange(value)
  {
    this.Alarm=value;
  }
  powerRangeChange(PowerRange)
  {
    this.PowerRange = PowerRange;
  }
  powerCoagulationRangeChange(CogPowerRange)
  {
    this.CogPowerRange = CogPowerRange;

  }
  onFDAChange(value)
  {
    this.FDA = value
  }

}