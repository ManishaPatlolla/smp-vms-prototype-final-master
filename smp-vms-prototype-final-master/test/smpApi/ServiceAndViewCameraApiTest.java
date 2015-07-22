package smpApi;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import models.Camera;
import org.junit.Before;
import org.junit.Test;
import play.Configuration;
import play.GlobalSettings;
import play.Logger;
import smpapi.AuthenticationApiImpl;
import smpapi.SearchAndViewCameraApi;
import smpapi.SearchAndViewCameraApiImpl;

import java.io.File;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;

/**
 * Created by Siva on 12/18/2014.
 */
public class ServiceAndViewCameraApiTest {
    Logger.ALogger logger=Logger.of(SearchAndViewCameraApi.class);

    private Configuration additionalConfigurations;

    @Before
    public void initialize(){
        Config additionalConfig = ConfigFactory.parseFile(new File("conf/application.conf"));
        additionalConfigurations = new Configuration(additionalConfig);
    }

    @Test
    public void testSearchAndViewCamera()
    {

        running(fakeApplication(new GlobalSettings()), () -> {
            try {
                SearchAndViewCameraApi api = new SearchAndViewCameraApiImpl();
                AuthenticationApiImpl login=new AuthenticationApiImpl();
                String token=login.login(additionalConfigurations.getString("userName"),additionalConfigurations.getString("password"));
                //test case 1 : List of all cameras
                List<Camera> result = api.retreiveCameras(token);
                System.out.println(result.size());
                assertNotNull(result);

                //test case 1 : List of cameras of that node returned
                List<Camera> result1 = api.retreiveCamerasByNode(token,additionalConfigurations.getString("nodeName"));
                System.out.println(result1.size());
                assertNotNull(result1);


//                //test case 2: user name is incorrect and password is correct
//                result = api.login("wrong user name", additionalConfigurations.getString("password"));
//                System.out.println(result);
//                assertEquals("Invalid User Name or Password", result);
//
//                //test case 3: user name is correct and password is incorrect
//                result = authenticationApi.login(additionalConfigurations.getString("userName"),"wrong password");
//                System.out.println(result);
//                assertEquals("Invalid User Name or Password", result);
//
//
//                //test case 4: user name is incorrect and password is incorrect
//                result = authenticationApi.login("wrong user name","wrong password");
//                System.out.println(result);
//                assertEquals("Invalid User Name or Password",result);
//
//                //test case 5: user name is invalid and password is invalid
//                result = authenticationApi.login(null,null);
//                System.out.println(result);
//                assertEquals("Invalid User Name or Password", result);
//
//                //test case 6: user name is invalid and password is invalid
//                result = authenticationApi.login("asdasd",null);
//                System.out.println(result);
//                assertEquals("Invalid User Name or Password", result);
//
//                //test case 7: user name is invalid and password is invalid
//                result = authenticationApi.login(null,"asdasd");
//                System.out.println(result);
//                assertEquals("Invalid User Name or Password", result);
//
//                //test case 8: when remote server is not reachable
////                result = authenticationApi.login(null,"asdasd");
////                System.out.println(result);
////                assertEquals("Internal Error Occurred. Please contact admin", result);
            }catch (Exception e)
            {
                e.printStackTrace();
            }
        });

    }

}
