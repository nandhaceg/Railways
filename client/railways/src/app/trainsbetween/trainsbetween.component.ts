import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpParams  } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { Select2OptionData } from 'ng2-select2';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import { StationService } from '../services/station.service';

@Component({
	selector: 'app-trainsbetween',
	templateUrl: './trainsbetween.component.html',
	styleUrls: ['./trainsbetween.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class TrainsbetweenComponent implements OnInit {

	validationval : any;
	show: boolean = true;
	trainsbetween : any;
	trainsbetweendays : any;
	date: any;

	options: DatepickerOptions = {
		barTitleIfEmpty: 'Click to select a date',
	};

	stationlist = [];

	constructor(private http: HttpClient, private toastr: ToastrService , private stationService: StationService) { }

  	ngOnInit() {

        this.stationlist = this.stationService.getStations();

  		this.date = '';

	    $("#sourcestation").select2({
	    	placeholder: "Select a Station",
	    	data: this.stationlist,
	    	tags: false,
	    	allowClear: true,
	    	minimumInputLength: 2,
	    	language: {
            	noResults: function(term) {
                	return "<p style='color:red ;font-size: 20px; font-weight:400'> No Station Found </p>";
            	}
        	},
		    escapeMarkup: function (markup) {
		        return markup;
		    }
	    });

	    $("#destinationstation").select2({
	    	placeholder: "Select a Station",
	    	data: this.stationlist,
	    	tags: false,
	    	allowClear: true,
	    	minimumInputLength: 2,
	    	language: {
            	noResults: function(term) {
                	return "<p style='color:red ;font-size: 20px; font-weight:400'> No Station Found </p>";
            	}
        	},
		    escapeMarkup: function (markup) {
		        return markup;
		    }
	    });
	    
  	}

  	stationdetails(){
  		var jdate = moment(this.date).format('DD-MM-YYYY');
  		var s_val = $("#sourcestation").select2('val');
  		var st = s_val.split("- ");
  		var st_val = st[1];

  		var d_val = $("#destinationstation").select2('val');
  		var dt = d_val.split("- ");
  		var dt_val = dt[1]

  		if(this.checkEmptyField(st_val,dt_val)){
  			if(this.validationval == 1){
  				this.toastr.error("Please choose source station!", "Error!");
  			}
  			else if(this.validationval == 2){
  				this.toastr.error("Please choose destination station!", "Error!");
  			}
  			else{
  				if(st_val == dt_val){
  					this.toastr.error("Source and destination cannot be same !", "Error!");
  				}
  				else{
  					let Params = new HttpParams();
  					Params = Params.append('src',st_val);
    				Params = Params.append('dest',dt_val);
    				Params = Params.append('date',jdate);
  					this.http.get("http://localhost:3000/pnr/trainsbetween",{params: Params}).subscribe((res:any) => {
  						this.show = false;
		                var result = JSON.parse(res);
		                this.trainsbetween = result.trains;
		            },
		            err => {
		                console.log(err);
		            });
  				}
  			}
  		}	
  	}

  	checkEmptyField(st_data,dt_data) {
        if (!(_.compact(st_data).length > 0 && _.compact(st_data).length == st_data.length)) {
           	return this.validationval = 1;
        } 
        else if(!(_.compact(dt_data).length > 0 && _.compact(dt_data).length == dt_data.length)) {
        	return this.validationval =2 ;
        }
        return this.validationval = 3 ;
    }

}