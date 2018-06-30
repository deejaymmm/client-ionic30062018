import { Component, ViewChild } from '@angular/core';
import { ToastController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../service/user';
import {UserService} from '../../service/user.service';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  
  @ViewChild('id') id;
  @ViewChild('username') username;
  @ViewChild('password') password;
  @ViewChild('email') email;

  editedUser: User;

  constructor(public nav: NavController, 
              public navParams: NavParams, 
              private serv: UserService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    let curUser = navParams.data;
    //console.log(navParams.data);
    this.editedUser = new User((curUser.userslen==0) ? 0 : curUser.newid,"","","");
  }

  ionViewDidLoad() {

  }

  // добавление пользователя
  saveNewUser() {
    this.editedUser = null;
    this.editedUser = new User(this.id.value, this.username.value, this.password.value, this.email.value);
    this.serv.createUser(this.editedUser).subscribe(data => {
      this.nav.pop();
      let toast = this.toastCtrl.create({
        message: 'You have created new user.',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }, error => { 
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Username "' + this.editedUser.Username + '" already exists.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  // на главную страницу
  goHome(){
    this.nav.popToRoot();
  }

}
