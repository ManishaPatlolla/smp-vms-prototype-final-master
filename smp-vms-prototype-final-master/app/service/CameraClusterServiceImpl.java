package service;

import business.CameraClusterBLL;
import com.google.inject.Inject;

import models.CameraCluster;
import play.data.validation.ValidationError;

import java.util.List;

/**
 * Created by Mani on 12/16/2014.
 */
public class CameraClusterServiceImpl implements CameraClusterService {

    @Inject
    CameraClusterBLL cameraClusterBLL;

    @Override
    public List<CameraCluster> findAll(int pageSize,int pageIndex) {
        return cameraClusterBLL.findAll(pageSize,pageIndex);
    }
    @Override
    public List<CameraCluster> search(String searchStr) {
        return cameraClusterBLL.search(searchStr);
    }

    @Override
    public List<CameraCluster> findByCameraClusterName(String searchStr) {
        return cameraClusterBLL.findByCameraClusterName(searchStr);
    }

    @Override
    public CameraCluster findById(Long id) {
        return cameraClusterBLL.findById(id);
    }

    @Override
    public List<ValidationError> addCameraCluster(CameraCluster cameraCluster) {
        return cameraClusterBLL.addCameraCluster(cameraCluster);
    }

    @Override
    public List<ValidationError> modifyCameraCluster(CameraCluster cameraCluster) {
        return cameraClusterBLL.modifyCameraCluster(cameraCluster);
    }

    @Override
    public List<ValidationError> deleteCameraCluster(Long id) {
        return cameraClusterBLL.deleteCameraCluster(id);
    }
}
