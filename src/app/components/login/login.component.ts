import { Component, inject } from '@angular/core';
import { IUserModel, User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginObj: User = new User;
  userSrv = inject(UserService)
  router = inject(Router)

  onLogin() {
  this.userSrv.loginUser(this.loginObj).subscribe(
    (res: IUserModel) => {
      localStorage.setItem("parkUser",JSON.stringify(res))
      this.router.navigateByUrl('dashboard')
    },
    (error) => {
      alert("Wrong");
      console.error(error);
    }
  );
}

}
