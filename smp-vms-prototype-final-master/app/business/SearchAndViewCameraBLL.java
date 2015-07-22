package business;

import models.User;

import java.util.List;

/**
 * Created by Siva on 12/18/2014.
 */
public interface SearchAndViewCameraBLL {

public List<String> getUserCameraFavourites(User user);


    public String getSelectedCameras(String cameraName);

}
