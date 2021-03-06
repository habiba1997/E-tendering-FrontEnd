import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { DataCommunicationService } from 'src/app/Services/data-Comunication.service';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/Services/http-service.service';
import { NavigationService } from 'src/app/Services/navigation.service';

@Component({
  selector: 'app-ultrasound-form',
  templateUrl: './ultrasound-form.component.html',
  styleUrls: ['../../../app.component.css'],
  providers:[DatePipe]
})
export class UltrasoundFormComponent  {

  PhysicalandErgonomicFeature:string;
  PhysicalandErgonomicFeaturesArray=["Room based wheeled unit",
"Slave Monitor", "Flexible Position Monitor (height and angle)",
"Flexible position control console (height and angle)", "Subdued console lighting"
];
PhysicalandErgonomicFeatures=[];
ScanModesArray=["B-Mode", "Tissue Harmonic Imaging", "Spatial Image Compounding",
 "M-Mode" , "Colour & Power Doppler", "Spectral Doppler" , "3-D Imaging","Real-Time 3-D", "Split Screen Imaging"];
ScanModes=[];

  countryOfOrigin;
  countriesArray;

  probs:string;
 
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


      var myDate = new Date();
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

   onProbsChange(value)
   {
      this.probs= value;
   }

   onFScanModesSelection(checked,value)
   {
    if(checked)
    {
      this.ScanModes.push(value);
    }
    else{
      this.remove(this.ScanModes,value);
    }  

   }


   onFeatureSelection(checked,value)
   {
    if(checked)
    {
      this.PhysicalandErgonomicFeatures.push(value);
    }
    else{
      this.remove(this.PhysicalandErgonomicFeatures,value);
    }   }

    remove(array:string[],removedObject:string):string[]
    {
      var pos = array.indexOf(removedObject);
      // Remove an item by index position
      var removedItem = array.splice(pos, 1);
      return array;
    }
      
    print()
{
  console.log(this.countryOfOrigin);    
  console.log(this.PhysicalandErgonomicFeatures);
  console.log(this.ScanModes);
  console.log(this.probs);
  console.log(this.FDA);
  console.log(this.Date)
  console.log(this.myDeadDate);
  console.log(this.Open)
  console.log(this.Direct)
  console.log(this.companiesSelected);
}
Submit() {
     console.log(this.obj());
     this.http.postTender(JSON.stringify(this.obj())).subscribe(data=>
      {
        console.log(data)
      });  }

  obj()
  {
    return {

      "Issued_Hospital_ID": "5d936ecf3464e85f1a8884da",
      "Device_Name": "Ultrasound",
      "Device_Data": {	
            "countryOfOrigin":this.countryOfOrigin,
            "PhysicalandErgonomicFeatures" :this.PhysicalandErgonomicFeatures,
            "ScanModes": this.ScanModes,
            "probs" : this.probs,
            "FDACertified":this.FDA
    },
      "startDate": this.Date,
      "deadlineDate": this.myDeadDate,
     "Direct_Process": this.Direct,
      "Open_Process": this.Open,
      "Companies_Selected":this.companiesSelected
    
    
    };
  }


  onFDAChange(value)
  {
    this.FDA = value
  }


}
