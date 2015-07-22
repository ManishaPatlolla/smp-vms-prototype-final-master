package smpApi;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import common.SmpApiCredential;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.Computer;
import play.Configuration;
import play.GlobalSettings;
import play.Logger;
import play.Play;
import play.libs.F;
import play.test.TestBrowser;
import service.CameraService;
import smpapi.AuthenticationApi;
import smpapi.AuthenticationApiImpl;

import java.io.File;

import static org.mockito.Mockito.mock;
import static play.test.Helpers.*;
import static org.junit.Assert.*;
import static org.fest.assertions.Assertions.assertThat;

/**
 * Created by milan on 12/18/2014.
 */
public class AuthenticationApiTest {

    Logger.ALogger logger=Logger.of(AuthenticationApiTest.class);

    private Configuration additionalConfigurations;

    @Before
    public void initialize(){
        Config additionalConfig = ConfigFactory.parseFile(new File("conf/application.conf"));
        additionalConfigurations = new Configuration(additionalConfig);
    }

    @Test
    public void testLogin()
    {

        running(fakeApplication(new GlobalSettings()), () -> {
            try {
                AuthenticationApi authenticationApi = new AuthenticationApiImpl();

                //test case 1 : user name and password is valid and correct
                String result = authenticationApi.login(additionalConfigurations.getString("userName"), additionalConfigurations.getString("password"));
                System.out.println(result);
                assertNotEquals("Invalid User Name or Password",result);


                //test case 2: user name is incorrect and password is correct
                result = authenticationApi.login("wrong user name", additionalConfigurations.getString("password"));
                System.out.println(result);
                assertEquals("Invalid User Name or Password", result);

                //test case 3: user name is correct and password is incorrect
                result = authenticationApi.login(additionalConfigurations.getString("userName"),"wrong password");
                System.out.println(result);
                assertEquals("Invalid User Name or Password", result);


                //test case 4: user name is incorrect and password is incorrect
                result = authenticationApi.login("wrong user name","wrong password");
                System.out.println(result);
                assertEquals("Invalid User Name or Password",result);

                //test case 5: user name is invalid and password is invalid
                result = authenticationApi.login(null,null);
                System.out.println(result);
                assertEquals("Invalid User Name or Password", result);

                //test case 6: user name is invalid and password is invalid
                result = authenticationApi.login("asdasd",null);
                System.out.println(result);
                assertEquals("Invalid User Name or Password", result);

                //test case 7: user name is invalid and password is invalid
                result = authenticationApi.login(null,"asdasd");
                System.out.println(result);
                assertEquals("Invalid User Name or Password", result);

                //test case 8: when remote server is not reachable
//                result = authenticationApi.login(null,"asdasd");
//                System.out.println(result);
//                assertEquals("Internal Error Occurred. Please contact admin", result);
            }catch (Exception e)
            {
                e.printStackTrace();
            }
        });

    }


}
