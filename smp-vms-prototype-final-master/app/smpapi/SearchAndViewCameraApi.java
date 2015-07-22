package smpapi;

import models.Camera;

import java.util.List;

/**
 * Created by Siva on 12/18/2014.
 */
public interface SearchAndViewCameraApi {

    /**
     * @param
     * @return list of cameras
     */

    public List<Camera> retreiveCameras(String token);
    public List<Camera> retreiveCamerasByNode(String token,String nodeName);
}
