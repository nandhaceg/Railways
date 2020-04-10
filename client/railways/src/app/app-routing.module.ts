import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PnrstatusComponent } from './pnrstatus/pnrstatus.component';
import { LivestatusComponent } from './livestatus/livestatus.component';
import { TrainsbetweenComponent } from './trainsbetween/trainsbetween.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
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
    },
    {
        path: "**",
        component: HomeComponent,
        data: { title: "home page" } 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent , LivestatusComponent , PnrstatusComponent , TrainsbetweenComponent]