import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SkillTreeComponent } from './skill-tree/skill-tree.component';
import { SkillChartComponent } from './skill-tree/skill-chart/skill-chart.component';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SkillTreeComponent,
    SkillChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
