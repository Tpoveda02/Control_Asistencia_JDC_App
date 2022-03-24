import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


/** Mterial */
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { GroupAddPageRoutingModule } from './group-add-routing.module';
import { GroupAddPage } from './group-add.page';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatToolbarModule } from "@angular/material/toolbar";
/** PrimeNg */
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { GroupService } from '../../services/group/group.service';
import { CourseService } from '../../services/course/course.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMatFileInputModule,
    MatToolbarModule,
    IonicModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ListboxModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule, 
    InputTextModule,
    RatingModule,
    SelectButtonModule,
    ButtonModule,
    GroupAddPageRoutingModule
  ],
  providers:[
    GroupService,
    CourseService
  ],
  declarations: [GroupAddPage]
})
export class GroupAddPageModule {}
