package business;

import models.Camera;
import models.User;
import smpapi.AuthenticationApiImpl;
import smpapi.SearchAndViewCameraApi;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Siva on 12/18/2014.
 */
public class SearchAndViewCameraBLLImpl implements SearchAndViewCameraBLL{

    SearchAndViewCameraApi api;
    @Override
    public List<String> getUserCameraFavourites(User user){
        List<String> results=new ArrayList<>();
    for(Camera c:user.favouriteCameras){
            results.add(c.name);
        }
        results.add("cam1");
        results.add("cam2");
        results.add("cam3");
        return results;
    }
    @Override
    public String getSelectedCameras(String cameraName){
        List<String> results=new ArrayList<String>();
        AuthenticationApiImpl login=new AuthenticationApiImpl();
        String token=login.login("steveless","password");
        List<Camera> allCameras=api.retreiveCameras(token);
        for(Camera c:allCameras){
            if(cameraName.equals(c.name))
                return c.friendly_name;
        }
       return "Not available";
    }
}
