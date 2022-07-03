import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { NewpostComponent } from './newpost/newpost.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'prefix'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'newpost',
    component:NewpostComponent
  },
  {
    path:'editpost/:id',
    component:EditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
