package service;

import business.CameraBLL;
import com.google.inject.Inject;
import models.Camera;
import play.data.validation.ValidationError;

import java.util.List;

/**
 * Created by milan on 12/9/2014.
 */
public class CameraServiceImpl implements CameraService {

    @Inject
    CameraBLL cameraBLL;

    @Override
    public List<Camera> findAll() {
        return cameraBLL.findAll();
    }

    @Override
    public List<Camera> search(String searchStr) {
        if (searchStr==null || searchStr.equals(""))
            return cameraBLL.findAll();
        else
            return cameraBLL.search(searchStr);
    }

    @Override
    public List<Camera> findByCameraName(String search) {
        return cameraBLL
                .findByCameraName(search);
    }

    @Override
    public Camera findById(Long id) {
        return cameraBLL.findById(id);
    }

    @Override
    public List<ValidationError> addCamera(Camera camera) {
        return cameraBLL.addCamera(camera);
    }

    @Override
    public List<ValidationError> updateCamera(Camera camera) {
        return cameraBLL.updateCamera(camera);
    }

    @Override
    public List<ValidationError> deleteCamera(Long id) {
        return cameraBLL.deleteCamera(id);
    }
}
