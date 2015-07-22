package controllers;

import com.google.inject.Inject;
import models.User;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Result;
import service.SearchAndViewCameraService;

import static play.mvc.Results.ok;

/**
 * Created by Siva on 12/18/2014.
 */
@BodyParser.Of(BodyParser.Json.class)
public class SearchAndViewCameraController {

    @Inject
    private SearchAndViewCameraService service;
    public Result searchAndViewCamera(){
          User user=new User();
//          user.user_name=additionalConfigurations.getString("username");
//          user.password=additionalConfigurations.getString("password");

        return ok(Json.toJson(service.getUserCameraFavourites(user)));

    }

    public Result searchByNode(String cameraName){

        return ok(Json.toJson(service.getSelectedCameras(cameraName)));
    }
}
