import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { PostService } from './../service/post.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {
  postGroup !:FormGroup;
  submitted = false;
  constructor(private formBuilder :FormBuilder,
    private router:Router, private postService:PostService) { }

  ngOnInit(): void {
    this.postGroup = this.formBuilder.group({
        name:['',Validators.required],
        title:['',Validators.required],
        status:[true,Validators.required],
        email:['',Validators.required],
        contactNumber:['',Validators.required],
        address:['',Validators.required],
    })
  }


    get f() {
      return this.postGroup.controls;
    }
    onclickButton() {
      this.router.navigate(['/']);
    }

    ngSubmit() {
      this.submitted = true;
      if(this.postGroup.valid){
        this.postService.savePostInfomation(this.postGroup.value)
        .pipe(first())
        .subscribe(
          res=>{

            this.router.navigate(['/']);
          }
        )
      }else{
        alert('Form validation failed')
      }
    }

}
