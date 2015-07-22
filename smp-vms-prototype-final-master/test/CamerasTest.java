import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.*;


import controllers.Cameras;
import controllers.routes;
import models.Camera;
import org.junit.Test;

import play.GlobalSettings;
import play.Logger;
import play.mvc.Result;
import play.test.FakeRequest;
import service.CameraService;

import java.util.List;
import play.test.*;
import static play.test.Helpers.*;
import static org.mockito.Mockito.*;
/**
 * Created by milan on 12/10/2014.
 */
public class CamerasTest {

    Logger.ALogger logger=Logger.of(CamerasTest.class);

    /**
     * Testing Service Layer. One controller method will call to one Service Layer Method.
     */
    @Test
    public void callFindAll()
    {
        CameraService cameraService=mock(CameraService.class);
        List<Camera> cameraList= cameraService.findAll();
        logger.info(cameraList.size()+"");
        for (Camera camera:cameraList)
        {
            logger.info(camera.name);
        }

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

    /**
     * Testing controller sample
     */
    @Test
    public  void  routerTest()
    {

        running(fakeApplication(new Global()), new Runnable() {
            @Override
            public void run() {
                Result result=route(fakeRequest(GET,"/api/cameras"));
                assertThat(result).isNotNull();
                assertThat(status(result)).isEqualTo(OK);
                assertThat(contentType(result)).isEqualTo("application/json");
                assertThat(charset(result)).isEqualTo("utf-8");
                System.out.println("routerTest() Json Response :"+contentAsString(result));

            }
        });

    }


}