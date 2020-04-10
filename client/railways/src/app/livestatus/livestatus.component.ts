import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpDownloadProgressEvent, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';

@Component({
  	selector: 'app-livestatus',
  	templateUrl: './livestatus.component.html',
  	styleUrls: ['./livestatus.component.css']
})
export class LivestatusComponent implements OnInit {

	livestat = {};
	show : boolean = true;
	livedata : any;
	position : any;
	route : any;

  	constructor(private http: HttpClient, private toastr: ToastrService) { 
  	}

  	ngOnInit() {
  	}

  	getlivestatus(){
	  	if (this.checkEmptyField(this.livestat)) {
	      	this.toastr.error("Please enter the train number!", "Error!");
		}
		else if (this.validatetrainno(this.livestat)) {
	     	this.toastr.error("Please enter valid train number!", "Error!");
	    }
	    else{
	    	this.http.post("http://localhost:3000/pnr/livestatus", this.livestat).subscribe((res:any)=> {
	    		this.show = false;
          		let result:any = JSON.parse(res);
          		this.livedata = result.current_station.name;
          		this.position = result.position;
          		this.route = result.route;
          		console.log(this.livedata,this.position,this.route);
			},
			error => {
				console.log(error);
			});
	    }
	}

	errorHandler(error:HttpErrorResponse){

	}

  	checkEmptyField(lstatus) {
	    let data: any = [lstatus.trainno];
	    if (_.compact(data).length > 0 && _.compact(data).length == data.length) {
	    	return false;
	    }
	    else {
	     	return true;
	    }
  	}

  	validatetrainno(lstatus: any): boolean {
    	let data: any = [lstatus.trainno];
    	if (/^\d{5}$/.test(data)) {
      		return false;
    	}
    	return true;
  	}

}
