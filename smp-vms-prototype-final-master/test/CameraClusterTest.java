import akka.event.slf4j.Logger;
import models.Camera;
import models.CameraCluster;
import org.fest.assertions.Assertions;
import org.junit.Test;
import play.api.data.validation.ValidationError;
import play.test.Helpers;
import service.CameraClusterService;
import service.CameraService;

import java.util.List;

import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static play.test.Helpers.*;

/**
 * Created by Mani on 12/18/2014.
 */
public class CameraClusterTest {

    play.Logger.ALogger logger= play.Logger.of(CameraClusterTest.class);

    @Test
    public void callFindAll()
    {
        CameraClusterService cameraService=mock(CameraClusterService.class);
        CameraCluster ca = new CameraCluster();
        ca.name = "test1";
//        ca.cameras = null;
//        ca.cameraAccessProfile = null;
        List<play.data.validation.ValidationError> ve = cameraService.addCameraCluster(ca);
        logger.info(ve.size()+"");

//        running(fakeApplication(fakeGlobal()), new Runnable() {
//            public void run() {
//                try {
//
//                    callAction(routes.ref.Cameras.findAll("_all"),fakeRequest(GET,"/"));
//
//
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        });
    }

}
