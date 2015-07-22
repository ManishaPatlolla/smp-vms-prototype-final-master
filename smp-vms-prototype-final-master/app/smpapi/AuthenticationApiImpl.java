package smpapi;


import com.fasterxml.jackson.databind.JsonNode;
import common.SmpApiCredential;
import common.SmpApiUrl;
import play.Logger;
import play.api.libs.json.Json;
import play.libs.F;
import play.libs.ws.*;
import play.libs.F.Function;
import play.libs.F.Promise;

import java.util.concurrent.TimeUnit;

/**
 * Created by milan on 12/18/2014.
 */
public class AuthenticationApiImpl implements AuthenticationApi{

    Logger.ALogger logger=Logger.of(AuthenticationApiImpl.class);


    @Override
    public String login(String userName, String password){

        try {
            logger.info("AuthenticationApiImpl.login start");
            logger.info("login url " + SmpApiUrl.loginUrl);
            logger.info("user & pass : " + userName + " " + password);
            Promise<JsonNode> jsonPromise = WS.url(SmpApiUrl.loginUrl).setContentType("application/x-www-form-urlencoded")
                    .post("username=" + userName + "&password=" + password).map(response -> {
                        return response.asJson();
                    });
            JsonNode response = jsonPromise.get(120, TimeUnit.SECONDS);

            logger.info("response" + response);
            int status = response.get("status").asInt();
            logger.info("AuthenticationApiImpl.login end");
            if (status == 3000) {
                return "Invalid User Name or Password";
            } else {

                return response.get("details").get(0).get("authToken").asText();
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "Internal Error Occurred. Please contact admin";
        }
    }
}
