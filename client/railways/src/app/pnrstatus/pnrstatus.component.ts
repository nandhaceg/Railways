import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import * as $ from "jquery";

@Component({
    selector: "app-pnrstatus",
    templateUrl: "./pnrstatus.component.html",
    styleUrls: ["./pnrstatus.component.css"]
})

export class PnrstatusComponent implements OnInit {

    railway = {};
    show: boolean = true;
    pnrdata: any;
    passres: any;

    constructor(private http: HttpClient, private toastr: ToastrService) {
        this.pnrdata = {
            trainno: "",
            trainname: "",
            journeydate: "",
            trainclass: "",
            from: "",
            to: "",
            reservedupto: "",
            boardingpoint: "",
        };
    }

    ngOnInit() {}

    getpnr(data) {
        if (this.checkEmptyField(data)) {
            this.toastr.error("Please enter your pnr!", "Error!");
        } 
        else if (this.validatepnr(data)) {
            this.toastr.error("Please enter valid pnr!", "Error!");
        } 
        else {
            this.http.post("http://localhost:3000/pnr", this.railway).subscribe((res:any) => {
                var result = JSON.parse(res);
                if(result.response_code==220){
                    this.toastr.error("Flushed pnr!", "Error!");
                }
                else if(result.response_code==221){
                    this.toastr.error("Please enter valid pnr!", "Error!");
                }
                else if(result.response_code==404){
                    this.toastr.error("No data available!","Error!");
                }
                else{
                    this.show = false;
                    this.pnrdata.trainno = result.train.number;
                    this.pnrdata.trainname = result.train.name;
                    this.pnrdata.journeydate = result.doj;
                    this.pnrdata.trainclass = result.journey_class.code;
                    this.pnrdata.from = result.from_station.name;
                    this.pnrdata.to = result.to_station.name;
                    this.pnrdata.reservedupto = result.reservation_upto.name;
                    this.pnrdata.boardingpoint = result.boarding_point.name;
                    this.passres = result.passengers;
                }
            },
            err => {
                console.log(err);
            });
        }
    }

    checkEmptyField(status) {
        let data: any = [status.pnr];
        if (_.compact(data).length > 0 && _.compact(data).length == data.length) {
            return false;
        } 
        else {
            return true;
        }
    }

    validatepnr(status: any): boolean {
        let data: any = [status.pnr];
        if (/^\d{10}$/.test(data)) {
            return false;
        }
        return true;
    }
}
