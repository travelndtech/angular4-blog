import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user:any;

    constructor(
      private usersService:UsersService
    ) { }

    ngOnInit() {
        this.usersService.getUserFromServer()
        .subscribe(
            data => {
                this.user = data.user;
            },
            err => {
                console.log(err);
                return false;
            }
        );
    }
}
