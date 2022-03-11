import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresenceStudentPageRoutingModule } from './presence-student-routing.module';

import { PresenceStudentPage } from './presence-student.page';


import { UserService } from 'src/app/services/user/user.service';
import { GroupService } from 'src/app/services/group/group.service';
import { PresenceService } from 'src/app/services/presence/presence.service';


// Primeng
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
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ListboxModule} from 'primeng/listbox';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresenceStudentPageRoutingModule,
    CommonModule,
    FormsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
    DataViewModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ListboxModule,
    IonicModule,
  ],
  declarations: [PresenceStudentPage],
  providers: [GroupService,UserService,PresenceService, MessageService, ConfirmationService]
})
export class PresenceStudentPageModule {}
