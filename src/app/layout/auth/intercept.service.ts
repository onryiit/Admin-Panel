import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { environment } from '../../../environment/environment'; // Bu yolun doğru olduğundan emin olun

// Class yerine fonksiyon olarak tanımlayın
export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {


  const authToken = Cookies.get('auth_token');


  if (authToken && req.url.startsWith(environment.apiEndpoint)) {


     const authReq = req.clone({
       setHeaders: {
         Authorization: `Bearer ${authToken}`
       }
     });


     return next(authReq);
  }

  return next(req);
};
