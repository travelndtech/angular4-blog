import { Component, OnInit  } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import {UsersService} from "../../users/users.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
    addPostForm:FormGroup;
    user:any;
    username:string;

    constructor(
        private postsService:PostsService,
        private usersService:UsersService
    ) { }

    ngOnInit() {
        this.usersService.getUserFromServer(this.user);
        this.username = this.usersService.user.name;

        this.addPostForm = new FormGroup({
            'name':         new FormControl(null, Validators.required),
            'body':         new FormControl(null, Validators.required),
            'author':       new FormControl(this.username, Validators.required),
            'published_at': new FormControl(new Date, Validators.required),
        });

    }

    submitForm() {
        this.postsService.createPost(this.addPostForm.value);
        this.postsService.addPostToServer(this.addPostForm.value);
    }
}
