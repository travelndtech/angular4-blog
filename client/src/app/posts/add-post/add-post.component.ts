import { Component, OnInit  } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup,FormControl,Validators } from '@angular/forms'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
    addPostForm:FormGroup;

    constructor(private postsService:PostsService) { }

    ngOnInit() {
        this.addPostForm = new FormGroup({
            'name':         new FormControl(null, Validators.required),
            'body':         new FormControl(null, Validators.required),
            'published_at': new FormControl(new Date, Validators.required),
        });

    }

    submitForm() {
        this.postsService.createPost(this.addPostForm.value);
        this.postsService.addPostToServer(this.addPostForm.value);
    }
}
