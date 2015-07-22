package dao;

import models.Camera;
import models.CameraCluster;
import play.data.validation.ValidationError;
import play.i18n.Messages;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Mani on 12/16/2014.
 */
public class CameraClusterDaoImpl implements CameraClusterDao {

    @Override
    public List<CameraCluster> findAll(int pageSize,int pageIndex) {
        System.out.println(findtotalNumberofCameraClusters());
        return CameraCluster.find.findPagingList(pageSize).getPage(pageIndex).getList();
    }

    @Override
    public Long findtotalNumberofCameraClusters() {
        return Integer.toUnsignedLong(CameraCluster.find.findRowCount());
    }


    @Override
    public List<CameraCluster> findByCameraClusterName(String search) {
        return CameraCluster.find.where().icontains("name",search).findList();
    }

    @Override
    public CameraCluster findById(Long id) {
        return CameraCluster.find.byId(id);
    }

    @Override
    public void addCameraCluster(CameraCluster cameraCluster) {

        cameraCluster.save();
    }

    @Override
    public void modifyCameraCluster(CameraCluster cameraCluster) {
        cameraCluster.update();
    }

    @Override
    public void deleteCameraCluster(CameraCluster cameraCluster) {
        CameraCluster cc = CameraCluster.find.ref(cameraCluster.id);
        cc.delete();
    }

    @Override
    public List<CameraCluster> search(String searchStr) {
        return CameraCluster.find.where().like("name",searchStr).findList();
    }

    @Override
    public List<CameraCluster> findByCameraClusterNameExceptGivenId(String name, Long id) {
        String query = "find cameracluster where cameracluster.name=:name and id != :id";
        return CameraCluster.find.setQuery(query).setParameter("name",name).setParameter("id",id).findList();

    }
}
