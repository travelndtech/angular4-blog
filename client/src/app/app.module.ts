import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';

import { AppComponent }         from './app.component';
import { HeaderComponent }      from './header/header.component';
import { FooterComponent }      from './footer/footer.component';
import { HomeComponent }        from './home/home.component';
import { PostsComponent }       from './posts/posts.component';
import { EditPostComponent }    from './posts/edit-post/edit-post.component';
import { AddPostComponent }     from './posts/add-post/add-post.component';
import { ViewPostComponent }    from './posts/view-post/view-post.component';
import { RegisterComponent }    from './users/register/register.component';
import { LoginComponent }       from './users/login/login.component';
import { ProfileComponent }     from './users/profile/profile.component';

import { Routes,RouterModule }  from '@angular/router';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }           from "@angular/http";
import { FlashMessagesModule }  from "angular2-flash-messages/module/module";


import { PostsService }         from './posts/posts.service';
import { UsersService }         from "./users/users.service";
import { PostItemComponent }    from './posts/posts-list/post-item/post-item.component';
import { PostsListComponent }   from './posts/posts-list/posts-list.component';
import { ShortenPipe }          from "./shorten.pipe";
import { AuthGuard }            from "./guard/auth.guard";

const appRoutes: Routes = [
    {path:'', component:HomeComponent},
    {path:'posts', component:PostsComponent, canActivate:[AuthGuard], children:[
        {path:'add-post', component:AddPostComponent},
        {path:':index/:id', component:ViewPostComponent },
        {path:':index/:id/edit-post', component:EditPostComponent }
    ]},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        PostsComponent,
        EditPostComponent,
        AddPostComponent,
        ViewPostComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        PostItemComponent,
        PostsListComponent,
        ShortenPipe
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FlashMessagesModule,
        HttpModule,
    ],
    providers: [PostsService,UsersService,AuthGuard],

    bootstrap: [AppComponent]
})
    export class AppModule { }
