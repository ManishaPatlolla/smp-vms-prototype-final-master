package service;

import models.Camera;
import play.data.validation.ValidationError;

import java.util.List;

/**
 * Created by milan on 12/9/2014.
 */
public interface CameraService {

    public List<Camera> findAll();

    List<Camera> search(String searchStr);

    List<Camera> findByCameraName(String search);

    Camera findById(Long id);

    List<ValidationError> addCamera(Camera camera);

    List<ValidationError> updateCamera(Camera camera);

    List<ValidationError> deleteCamera(Long id);
}
