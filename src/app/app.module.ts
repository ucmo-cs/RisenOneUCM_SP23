import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MatInputModule } from '@angular/material/input';
import { AddReportComponent } from './add-report/add-report.component';
import { MatDialogModule,MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { PDF_FormatComponent } from './pdf-format/pdf-format.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
//This is a push test
//console.log ("test");
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DataTableComponent,
    AddReportComponent,
    PDF_FormatComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatMenuModule,
    RouterModule.forRoot([
      {path: 'top-bar-component', component: TopBarComponent},
      {path: 'login-component', component: LoginComponent},
      {path: 'data-table-component', component: DataTableComponent},
      {path: '', redirectTo: '/login-component', pathMatch: 'full'},
    ]),
  ],
  providers: [HttpErrorHandler,
              MessageService,
              {
                provide: MatDialogRef,
                useValue: {}
              },
              { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MdDialogRef, useValue: {} }, --> deprecated
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
