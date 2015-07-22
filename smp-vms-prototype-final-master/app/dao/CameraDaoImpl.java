package dao;

import models.Camera;
import play.data.validation.ValidationError;
import play.i18n.Messages;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by milan on 12/9/2014.
 */
public class CameraDaoImpl implements CameraDao{
    @Override
    public List<Camera> findAll() {
        return Camera.find.all();
    }

    @Override
    public List<Camera> findByCameraName(String search) {
        return Camera.find.where().icontains("name", search).findList();
    }

    @Override
    public List<Camera> findByCameraNameExceptGivenId(String name,Long id) {
        String query = "find camera where camera.name=:name and id != :id";
        return Camera.find.setQuery(query).setParameter("name",name).setParameter("id",id).findList();
    }

    @Override
    public List<Camera> search(String searchStr) {
        return Camera.find.where().like("name",searchStr).like("node",searchStr).like("locationName",searchStr).findList();
    }
    @Override
    public Camera findById(Long id) {
        return Camera.find.byId(id);
    }

    @Override
    public void addCamera(Camera camera) {
         camera.save();
    }

    @Override
    public void updateCamera(Camera camera) {
        camera.update();
    }

    @Override
    public List<play.data.validation.ValidationError> deleteCamera(Long id) {
         Camera camera=Camera.find.byId(id);
        List<ValidationError> errors=new ArrayList<ValidationError>();
        if(camera==null)
        {
            ValidationError ve=new ValidationError("camera.notFound",Messages.get("camera.notFound"));
            errors.add(ve);

        }
        try {
            camera.delete();
        }
        catch (Exception e){
            ValidationError ve=new ValidationError("error",e.getMessage());
            errors.add(ve);

        }
        return errors;
    }
}
