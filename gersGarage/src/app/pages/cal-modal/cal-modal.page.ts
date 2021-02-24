import { Component, AfterViewInit} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {

  date= new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    formatDayHeader : 'EEEEEE'
  };
  viewTitle: string;
  
  event = {
    title: '',
    desc: '',
    startTime: null,
    //allDay: true
  };

  isNotEmpty=false;
  modalReady = false;
 
  constructor(private modalCtrl: ModalController) { }
 
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
    
  }
 
  save() {    
    console.log(this.event);
    this.modalCtrl.dismiss({event: this.event})
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    console.log('first', this.event)
    this.event.startTime = new Date(ev.selectedTime);
    this.isNotEmpty=true;
  }
 
  close() {
    this.modalCtrl.dismiss();
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    var future = new Date;
    future.setDate(current.getDate() + 28);
    //console.log('Future',future);

    return  (date.getDay()==6 || date.getDay()==0 || date < current || date>future) ;
}

next(){
  var newDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth()+1));
  this.calendar.currentDate = newDate;
}

last(){
  var newDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth()-1));
  this.calendar.currentDate = newDate;
}

 
}