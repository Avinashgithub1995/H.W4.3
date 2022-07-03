import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allinfomationArray  !:any;
  constructor(private postService : PostService , private router :Router) { }
  filterString = ''
  ngOnInit(): void {
    this.defaultLoadData()
  }

  onclickButton() {
    this.router.navigate(['/newpost']);
  }

  defaultLoadData() {
    this.postService.getAllInfomation()
    .pipe(first())
    .subscribe(
      result=>{
          this.allinfomationArray = result;
      }
    )
  }

  onClickFilterData() {
      this.postService.getfilterInfomation(this.filterString)
      .pipe(first())
      .subscribe(
        result=>{
          this.allinfomationArray = result;
        }
      )
  }

  deleteRecord(data:any) {
    this.postService.deletePostInfomation(data._id)
    .pipe(first())
    .subscribe(
      result=>{
        this.defaultLoadData();
      }
    )
  }


  updateInformation(data :any){
    this.router.navigate(['/editpost', data._id]);
  }


  inactiveActive(data:any){
    this.postService.inactiveStatus(data.status , data._id)
    .pipe(first())
    .subscribe(
      result=>{
        this.defaultLoadData();
      }
    )
  }

}
