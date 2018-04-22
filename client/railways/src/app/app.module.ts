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
import { HomeComponent } from './home/home.component';
import { PnrstatusComponent } from './pnrstatus/pnrstatus.component';
import { LivestatusComponent } from './livestatus/livestatus.component';
import { TrainsbetweenComponent } from './trainsbetween/trainsbetween.component';

const appRoutes: Routes = [
	{
    	path: "",
    	component: HomeComponent,
    	data: { title: "home page" }
	},
	{
		path: "pnrstatus",
		component: PnrstatusComponent,
		data: { title: "pnr status" }
	},
	{
		path: "livestatus",
		component: LivestatusComponent,
		data: { title: "live status" }
	},
	{
		path: "trainsbetween",
		component: TrainsbetweenComponent,
		data: { title: "trains between" }
	}
	
];

@NgModule({
	declarations: [
    	AppComponent,
    	HomeComponent,
    	PnrstatusComponent,
    	LivestatusComponent,
    	TrainsbetweenComponent
  	],
  	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		Select2Module,
		NgxTypeaheadModule,
		NgDatepickerModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-center',
    		preventDuplicates: true,
		}),
    	RouterModule.forRoot(
			appRoutes,
		)
  	],
  	providers: [],
  	bootstrap: [AppComponent]
})
export class AppModule { }
