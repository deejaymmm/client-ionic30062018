import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {User} from '../../service/user';
import {UserService} from '../../service/user.service';
import {EditPage} from '../edit/edit';
import {AddPage} from '../add/add';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
  
@Component({ 
    selector: 'app-root', 
    templateUrl: './home.html',
    providers: [UserService]
}) 
export class HomePage implements OnInit {
    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
      
    users: Array<User>;
      
    constructor(private serv: UserService,
                public nav: NavController,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {
                this.users = new Array<User>();
    }
      
    ngOnInit() {
       // this.loadUsers();
    }

    // загрузка пользователей
    ionViewWillEnter() {
        let loader = this.loadingCtrl.create({
            content: 'Getting data...'
            //spinner: 'dots'
          });
        loader.present();
        this.loadUsers();
        setTimeout(() => {
            loader.dismiss();
          }, 1000);
    }

    //загрузка пользователей
    private loadUsers() {
        this.serv.getUsers().subscribe((data: User[]) => {
                this.users = data;  
            }, error => {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'No connection to database.'
                  });
                alert.present();
            });
    }

    // на страницу редактирования пользователя
    navEditUser($event, user){
        this.nav.push(EditPage, user);
    }

    // на страницу добавления нового пользователя
    addNewUser(a, b) {
        this.nav.push(AddPage, {
            userslen: a,
            newid: b
        });
    }
}