import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule , FormGroup} from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// primeng
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button'; 
import { PanelModule } from 'primeng/panel'; 
import { CalendarModule } from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { UserEditComponent } from './Components/users/user-edit.component';
import { ProductComponent } from './Components/products/getProducts/product.component';
import { AddProductComponent } from './Components/products/addProduct/addproduct.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ProductComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    routing,
    MenubarModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    FileUploadModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
