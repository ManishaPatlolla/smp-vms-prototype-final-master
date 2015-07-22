package business;

import models.Camera;
import models.CameraCluster;
import play.data.validation.ValidationError;

import java.util.List;

/**
 * Created by Mani on 12/16/2014.
 */
public interface CameraClusterBLL {

    public List<CameraCluster> findAll(int pageSize,int pageIndex);

    List<CameraCluster> findByCameraClusterName(String search);

    CameraCluster findById(Long id);

    List<ValidationError> addCameraCluster(CameraCluster cameraCluster);

    List<ValidationError> modifyCameraCluster(CameraCluster cameraCluster);

    List<ValidationError> deleteCameraCluster(Long id);

    List<CameraCluster> search(String searchStr);

}
