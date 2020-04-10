import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
declare var jquery: any;
declare var $: any;
import { Select2Module } from 'ng2-select2'; 
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { Services } from '@angular/core/src/view';
import { StationService } from './services/station.service';
import { AppRoutingModule , routingComponents } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		routingComponents
  	],
  	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		Select2Module,
		NgxTypeaheadModule,
		NgDatepickerModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-center',
    		preventDuplicates: true,
		})
  	],
  	providers: [
		  StationService
	  ],
  	bootstrap: [AppComponent]
})
export class AppModule { }