import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';


@Injectable()
export class Functions {

    constructor(private tokenStorage: TokenStorageService) {}

    ngOnInit(){
    }
	
    logOut(){
        this.tokenStorage.signOut();
     }

}