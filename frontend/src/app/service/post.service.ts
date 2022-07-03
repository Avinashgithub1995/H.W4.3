import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }


  getById(id : string) {
    return this.http.get<any>('http://localhost:4000/post-api?action=getbyid', {params:{id:id}});
  }

  getAllInfomation () {
    return this.http.get<any>('http://localhost:4000/post-api?action=getallPost');
  }

  getfilterInfomation (id : any) {
    return this.http.get<any>('http://localhost:4000/post-api?action=filterinfomation' , {params:{id:id}});
  }

  savePostInfomation (obj : any) {
    return this.http.post<any>('http://localhost:4000/post-api?action=createPost' ,obj);
  }

  updatePostInformation (obj : any) {
    return this.http.patch<any>('http://localhost:4000/post-api?action=updateAllInfo' ,obj);
  }

  deletePostInfomation (obj : any) {
    return this.http.delete<any>('http://localhost:4000/post-api?action=deletepost' , {params:{id:obj}});
  }

  inactiveStatus (status : any , id :string) {
    return this.http.put<any>('http://localhost:4000/post-api?action=statusupdate' ,{status:status , id:id});
  }


}
