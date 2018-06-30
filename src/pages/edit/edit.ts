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
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  
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
    this.editedUser = new User(curUser.Id, curUser.Username, curUser.Password, curUser.Email);
  }

  ionViewDidLoad() {

  }

  // редактирование пользователя
  saveEditUser() {
    this.editedUser = null;
    this.editedUser = new User(this.id.value, this.username.value, this.password.value, this.email.value);
    this.serv.updateUser(this.editedUser.Id, this.editedUser).subscribe(data => {
      this.nav.pop();
      let toast = this.toastCtrl.create({
        message: 'You have updated this user.',
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

  // удаление пользователя
  deleteEditUser() {
     let alert = this.alertCtrl.create({
        title: 'Delete user?',
        message: 'Are you sure to delete this user?',
        buttons: [
          { text: 'No' },
          {
            text: 'Yes',
            handler: () => {
                this.serv.deleteUser(this.editedUser.Id).subscribe(data => {
                this.nav.pop();
                let toast = this.toastCtrl.create({
                  message: 'You have deleted this user.',
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present();
              });
            }
          }
        ]
      });
      alert.present();
    }

  // на главную страницу
  goHome(){
    this.nav.popToRoot();
  } 

}
