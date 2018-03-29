import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from '../video.service';
@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {


  videos: Array<Video>;
  selectedVideo: Video;
  private hidenewVideo: boolean = true;
  constructor(private _videosservice: VideoService) { }

  ngOnInit() {
    this._videosservice.getVideo()
      .subscribe(data => this.videos = data);

  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video) {
    this._videosservice.addVideo(video)
      .subscribe(resNewVideo => this.videos.push(resNewVideo));
    this.hidenewVideo = true;
  }
  onUpdateVideoEvent(video: any) {
    this._videosservice.putVideo(video)
      .subscribe(resUpdateVideo => video = resUpdateVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video:any){
    let videoArray = this.videos;
    this._videosservice.deleteVideo(video)
    .subscribe(resDeletedVideo=>{
      for(let i=0;i<videoArray.length;i++)
      {
        if(videoArray[i]._id===video._id)
        {
          videoArray.splice(i,1);
        }
      }
    });
    this.selectedVideo=null;
  }

  newVideo() {
    this.hidenewVideo = false;
  }
}
