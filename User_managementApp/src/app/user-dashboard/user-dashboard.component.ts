import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamComponent, WebcamImage, WebcamInitError, WebcamModule, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, WebcamModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;
  errors : WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  

  ngOnInit(): void {
      WebcamUtil.getAvailableVideoInputs().then(
        (mediaDevices : MediaDeviceInfo[])=>{
          this.isCameraExist = mediaDevices && mediaDevices.length > 0;
        }
      );
  }

  takeSnapshot():void{
    this.trigger.next();
  }

  onOffWebcam():void{
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError){
    this.errors.push(error);
  }


  changeWebcam(directionorDeviceId: boolean | string){
    this.nextWebcam.next(directionorDeviceId);
  }

  handleImage(webcamImage: WebcamImage){
    this.getPicture.emit(webcamImage);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void>{
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string>{
    return this.nextWebcam.asObservable();
  }
}
