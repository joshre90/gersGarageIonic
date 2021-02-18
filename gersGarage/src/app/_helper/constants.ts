//service with general functions and global variable to use over the project
import  {Injectable} from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class Constants {

    public registerState: Boolean;
    public vehicleList: [];
    public isHistoryService: Boolean;
    public historyList: [];
    public hours: any []; 
    public bookingDetails: [];
    public mechanics: [];
    userId: string;

    constructor(private userService: UserService, 
        private tokenStorage: TokenStorageService) {}

    ngOnInit(){
        this.hours = [{hour:'8:00'}, {hour:'10:30'}, {hour:'13:00'}, {hour:'15:30'}] ;
        this.userId = this.tokenStorage.getUser().id;
    }
        // Function to get vehicles per user
       /*  checkIfCarsExist(){
        this.userService.getVehicleList(this.tokenStorage.getUser().id).subscribe(data => {
                this.vehicleList = JSON.parse(data);
                //console.log('Num of vehicles: ',this.vehicleList.length)
                if (this.vehicleList.length > 0) {
                    this.registerState = true
                    //console.log(this.registerState)
                } else {
                    this.registerState = false
                }
            },
            err => {
                err.error;
                console.log(err.error);
                this.registerState = false;
            }
        );
    }

    //Get the list of bookings per user 
    serviceHistoryList(){
        this.userService.getServiceHistory(this.tokenStorage.getUser().id).subscribe(data => {
                this.historyList = JSON.parse(data);
                //console.log('Num of bookings: ',this.historyList.length)
                if (this.historyList.length > 0) {
                    this.isHistoryService = true
                } else {
                    this.isHistoryService = false
                }
            },
            err => {
                err.error;
                //console.log(err.error);
                this.isHistoryService = false;
            }
        );
    }

    //Get the mechanic list
    getMechanicsList(){
        this.userService.getMechanicList().subscribe(data => {
            this.mechanics = JSON.parse(data);
            //console.log('Mechanics: ', this.mechanics);
        },
        err => {
            err.error;
            //console.log(err.error);
        }
    );
    } */


}