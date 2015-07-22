package dao;

import models.Camera;
import play.data.validation.ValidationError;

import java.util.List;

/**
 * Created by milan on 12/9/2014.
 */
public interface CameraDao {
    public List<Camera> findAll();

    List<Camera> findByCameraName(String search);

    Camera findById(Long id);

    void addCamera(Camera camera);

    void updateCamera(Camera camera);

    List<ValidationError> deleteCamera(Long id);
    List<Camera> findByCameraNameExceptGivenId(String name,Long id);

    List<Camera> search(String searchStr);
}
