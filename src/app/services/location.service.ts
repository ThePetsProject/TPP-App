import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  getPosition(): Observable<any> {
    return new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  getAddress(lng: string, lat: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiYWxmYWpvcnMiLCJhIjoiY2lpYXprZHk5MDE0NHdlbHoxeW9nb3VhcCJ9.ECqkPMIYu9mCnck3GWKEyQ&types=address&language=es`;
    return this.httpClient.get(url).pipe(
      map((response: any) => response.features[0].place_name),
      catchError((error) => throwError(() => error))
    );
  }
}
