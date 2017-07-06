import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Post} from "./posts.model";
import {Subject} from "rxjs/Subject";
import { Router } from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages/module/flash-messages.service";

@Injectable()

export class PostsService{
    postsChanged = new Subject<Post[]>();

    //this array will be populated from the database
    private posts:Post[] = [];

    constructor(
        private http:Http,
        private router:Router,
        private msg:FlashMessagesService

    ) { }

    setPosts(posts:Post[]) {
        //populating the posts array
        this.posts = posts;
        this.postsChanged.next(this.posts.slice());
    }

    createPost(post:Post) {
        //pushing the new post to the array
        this.posts.push(post);
        this.postsChanged.next(this.posts.slice());
    }

    readPosts() {
        //returning a copy of the posts array
        return this.posts.slice();
    }

    readPost(index:number) {
        return this.posts[index];
    }

    updatePost(index:number, post:Post) {
        this.posts[index] = post;
        this.postsChanged.next(this.posts.slice());
    }

    deletePost(index:number) {
        this.posts.splice(index,1);
        this.postsChanged.next(this.posts.slice());
    }

    // getPostFromServer(id:string) {
    //     return this.http.get('http://localhost:3000/api/posts/' + id)
    //     .subscribe((response:Response) => response.json());
    // }

    getPostsFromServer() {
        return this.http.get('http://localhost:3000/api/posts/')
        .map(
            (response:Response) => {
                const posts:Post[] = response.json();
                return posts;
            }
        )
        .subscribe(
            (posts:Post[]) => {
                //insert the posts from server to the posts array
                this.setPosts(posts);
            }
        );
    }

    addPostToServer(post:Post) {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('http://localhost:3000/api/posts/add-post', post ,options)
        .map((response:Response) => response.json())
        .subscribe(
            (data:Post[]) => {
                if(data) {
                    this.getPostsFromServer();
                    this.msg.show('Post submitted!', { cssClass: 'alert-success', timeout: 2000 });
                    this.router.navigate(['posts']);
                } else {
                    this.msg.show('Error while adding post.', { cssClass: 'alert-danger', timeout: 2000 });
                }
            }
        )
    }

    updatePostFromServer(id:string, post:Post) {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put('http://localhost:3000/api/posts/' + id, post, options)
        .map((response:Response) => response.json())
        .subscribe(
            (data:Post[]) => {
                if(data) {
                    this.getPostsFromServer();
                    this.msg.show('Post updated!', { cssClass: 'alert-success', timeout: 2000 });
                    this.router.navigate(['posts']);
                }
            }
        );
    }

    deletePostFromServer(id:string) {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.delete('http://localhost:3000/api/posts/' + id ,options)
        .map((response:Response) => response.json())
        .subscribe(
            (data) => {
                this.getPostsFromServer();
                this.router.navigate(['posts']);
                this.msg.show('Post deleted!', {cssClass: 'alert-success', timeout: 2000});
            }
        );
    }
}