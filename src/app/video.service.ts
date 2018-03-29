import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Video } from './video';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class VideoService {
  private _geturl: string ="/api/videos";
  private _posturl: string="/api/video";
  private _puturl: string ="/apt/video/";
  private _deleteurl = "/api/video/";
  constructor(private http: HttpClient) { }
  
  getVideo():Observable<Video[]>{
    return this.http.get<Video[]>(this._geturl);
  }
  

  addVideo (video: Video): Observable<Video> {
    return this.http.post<Video>(this._posturl, video, httpOptions)
      /*.pipe(
        catchError(this.handleError('addHero', hero))
      );*/
  }


  putVideo (video: Video): Observable<Video> {
    return this.http.put<Video>(this._puturl + video._id, video, httpOptions)
      /*.pipe(
        catchError(this.handleError('addHero', hero))
      );*/
  }

deleteVideo (video: Video): Observable<Video> {
  return this.http.delete<Video>(this._deleteurl + video._id)
    /*.pipe(
      catchError(this.handleError('addHero', hero))
    );*/
}
}