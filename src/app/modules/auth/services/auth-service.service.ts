import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP_AUTH } from '../../../core/constants/endpoints.constants';
import { LoginInterface, LoginResponseInterface } from '../../../core/interfaces/login.interfaces';
import { SessionService } from '../../../shared/services/session/session-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,private sessionService:SessionService) { }

  doLogin(data:LoginInterface){
    return this.http.post<LoginResponseInterface>(EP_AUTH.login,data,this.sessionService.baseHeadersPublic)
  }

  fakeLoginUnSuccessfull(email:string){
    return this.http.post<LoginResponseInterface>(EP_AUTH.login,{email},this.sessionService.baseHeadersPublic)
  }

  getProfile():any{
    return {
      name:'John',
      lastname:'Doe',
      email:'mail@mail.com',
      profilePicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabpp9cRSP2RA-PsVT6watU3wUMgam3AI_ow&s',
    }
  }

}
