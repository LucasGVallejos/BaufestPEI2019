import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { Restangular } from "ngx-restangular";

export function RestangularConfigFactory(RestangularProvider: any) {
  RestangularProvider.setBaseUrl(environment.webApiUrl);
  RestangularProvider.setDefaultHttpFields({ cache: false });
}
