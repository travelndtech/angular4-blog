import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Post} from "../posts.model";
import {PostsService} from "../posts.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit,OnDestroy {
    posts:Post[];
    subscription:Subscription;

    constructor(
        private postsService:PostsService,
        private router:Router,
        private route:ActivatedRoute
    ) { }


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

    goToAddPost() {
        this.router.navigate(['add-post'], {relativeTo:this.route});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
