import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { UserEditComponent } from './Components/users/user-edit.component';
import { ProductComponent } from './Components/products/getProducts/product.component';
import { AddProductComponent } from './Components/products/addProduct/addproduct.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

const appRoutes : Routes = [
    { path:'', component: HomeComponent },
    { path:'', redirectTo: 'home', pathMatch:'full' },
    { path:'home', component: HomeComponent },
    { path:'user-edit', component: UserEditComponent },
    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
    { path:'product', component: ProductComponent },
    { path:'addproduct', component: AddProductComponent },
    // { path:'**', component: HomeComponent }
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);