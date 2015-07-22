package dao;

import models.Camera;
import models.CameraCluster;
import play.data.validation.ValidationError;

import java.util.List;

/**
 * Created by Mani on 12/16/2014.
 */
public interface CameraClusterDao {

    List<CameraCluster> findAll(int pageSize,int pageIndex);

    Long findtotalNumberofCameraClusters();

    List<CameraCluster> findByCameraClusterName(String search);

    CameraCluster findById(Long id);

    void addCameraCluster(CameraCluster cameraCluster);

    void modifyCameraCluster(CameraCluster cameraCluster);

    void deleteCameraCluster(CameraCluster cameraCluster);

    List<CameraCluster> findByCameraClusterNameExceptGivenId(String name,Long id);

    List<CameraCluster> search(String searchStr);
}
