import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private usersService:UsersService,
        private router:Router
    ) { }

    ngOnInit() {
    }

    onLogout() {
        this.usersService.logout();
        console.log('logged out!');
        return false;
    }
}
