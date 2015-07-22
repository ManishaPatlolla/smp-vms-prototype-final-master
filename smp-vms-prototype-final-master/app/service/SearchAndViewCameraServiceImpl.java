package service;

import business.SearchAndViewCameraBLL;
import models.User;

import java.util.List;

/**
 * Created by Siva on 12/18/2014.
 */
public class SearchAndViewCameraServiceImpl implements SearchAndViewCameraService{

    SearchAndViewCameraBLL searchAndViewCameraBLL;

    @Override
    public List<String> getUserCameraFavourites(User user) {
        return searchAndViewCameraBLL.getUserCameraFavourites(user);

    }
    @Override
    public  String getSelectedCameras(String cameraName){
        return searchAndViewCameraBLL.getSelectedCameras(cameraName);
    }
}
