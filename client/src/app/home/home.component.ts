import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts/posts.service";
import {Post} from "../posts/posts.model";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts:Post[];
    subscription:Subscription;

    constructor(private postsService:PostsService) { }

    ngOnInit() {
        this.subscription = this.postsService.postsChanged
        .subscribe(
            (posts:Post[]) => {
                this.posts = posts;
            }
        );
        
        this.postsService.getPostsFromServer();
        this.posts = this.postsService.readPosts();
    }
}
