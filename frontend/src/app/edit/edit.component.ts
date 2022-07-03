import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  postGroup !:FormGroup;
  submitted = false;
  defaultUrl !:any;
  constructor(private formBuilder :FormBuilder,
    private router:Router,  private route: ActivatedRoute, private postService:PostService) { }

  ngOnInit(): void {
    this.postGroup = this.formBuilder.group({
        name:['',Validators.required],
        title:['',Validators.required],
        status:[true,Validators.required],
        email:['',Validators.required],
        contactNumber:['',Validators.required],
        address:['',Validators.required],
    });

    this.defaultUrl = this.route.snapshot.paramMap.get('id')
    this.postService.getById(this.defaultUrl)
    .pipe(first())
    .subscribe(
      res=>{
        this.postGroup.controls['name'].setValue(res.name);
        this.postGroup.controls['title'].setValue(res.title);
        this.postGroup.controls['email'].setValue(res.email);
        this.postGroup.controls['contactNumber'].setValue(res.contactNumber);
        this.postGroup.controls['address'].setValue(res.address);
      }
    )
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
        this.postService.updatePostInformation(this.postGroup.value)
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
