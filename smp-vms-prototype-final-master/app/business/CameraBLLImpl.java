package business;

import com.google.inject.Inject;
import dao.CameraDao;
import models.Camera;
import play.data.validation.ValidationError;
import play.i18n.Messages;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by milan on 12/9/2014.
 */
public class CameraBLLImpl implements CameraBLL {

    @Inject
    CameraDao cameraDao;

    @Override
    public List<Camera> findAll() {
        return cameraDao.findAll();
    }

    @Override
    public List<Camera> findByCameraName(String search) {
        return cameraDao.findByCameraName(search);
    }

    @Override
    public Camera findById(Long id) {
        return cameraDao.findById(id);
    }

    @Override
    public List<ValidationError> addCamera(Camera camera) {
        List<ValidationError> errors = new ArrayList<ValidationError>();
        try {

           if(!isCameraNameExistForAddingNewCamera(camera))
                cameraDao.addCamera(camera);
            else
               errors.add(new ValidationError("camera.nameAlreadyExist", Messages.get("camera.nameAlreadyExist")));

        } catch (Exception e) {
            ValidationError ve=new ValidationError(e.getMessage(),e.getMessage());
            errors.add(ve);
        }

        return errors;
    }

    private boolean isCameraNameExistForAddingNewCamera(Camera camera)
    {
        List<Camera> cameras=cameraDao.findByCameraName(camera.name);
        return cameras == null || cameras.isEmpty()?false:true;
    }

    private boolean isCameraNameExistForUpdatingCamera(Camera camera)
    {
        List<Camera> cameras=cameraDao.findByCameraNameExceptGivenId(camera.name, camera.id);
        return cameras == null || cameras.isEmpty()?false:true;
    }

    @Override
    public List<ValidationError> updateCamera(Camera camera) {
        List<ValidationError> errors = new ArrayList<ValidationError>();
        try {
            cameraDao.updateCamera(camera);
        } catch (Exception e) {
            ValidationError ve=new ValidationError(e.getMessage(),e.getMessage());
            errors.add(ve);
        }

        return errors;
    }

    @Override
    public List<ValidationError> deleteCamera(Long id) {
        return cameraDao.deleteCamera(id);
    }

    @Override
    public List<Camera> search(String searchStr) {
        return cameraDao.search(searchStr);
    }


}
