package smpapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import common.SmpApiUrl;
import models.Camera;
import play.Logger;
import play.libs.F.Promise;
import play.libs.ws.WS;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

;

/**
 * Created by Siva on 12/18/2014.
 */
public class SearchAndViewCameraApiImpl implements SearchAndViewCameraApi {

    /**
     * @param nodename
     * @return list of cameras
     */

    Logger.ALogger logger=Logger.of(SearchAndViewCameraApiImpl.class);

    public List<Camera> retreiveCameras(String token){
        List<Camera> cameras=new ArrayList<Camera>();

        try {

            logger.info("Retrieve AllCameras start");
            logger.info("RetreiveAllCameras url " + SmpApiUrl.retreieveCamerasUrl);

            Promise<JsonNode> jsonPromise = WS.url(SmpApiUrl.retreieveCamerasUrl).setContentType("application/x-www-form-urlencoded").setHeader("X-AUTH-TOKEN", token).get()
                    .map(response -> {
                        return response.asJson();
                    });

            JsonNode result = jsonPromise.get(60);
            ArrayNode arrayNode = (ArrayNode) result.get("details");
            System.out.println("Response = " + result.asText());
            Iterator<JsonNode> it = arrayNode.iterator();
            while (it.hasNext()) {
                JsonNode n = it.next();
                Camera cam = new Camera();

                cam.name = n.get("name").asText();
                cam.friendly_name = n.get("url").asText();


                cameras.add(cam);
            }

            logger.info("response" + result);
            int status = result.get("status").asInt();
            logger.info("SearchCamera.byNodeName  end");
            if (status == 0) {
                return cameras;
            } else {

                return null;
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }


    }

    @Override
    public List<Camera> retreiveCamerasByNode(String token,String nodeName){
        List<Camera> cameras=new ArrayList<Camera>();

        try {

            logger.info("Retrieve Cameras By node  start");
            logger.info("Retreive Cameras By node url " + SmpApiUrl.retreieveCamerasUrl);

            Promise<JsonNode> jsonPromise = WS.url(SmpApiUrl.retreieveCamerasByNodeUrl).setContentType("application/x-www-form-urlencoded").setHeader("X-AUTH-TOKEN", token).post("node"+nodeName)
                    .map(response -> {
                        return response.asJson();
                    });

            JsonNode result = jsonPromise.get(60);
            ArrayNode arrayNode = (ArrayNode) result.get("details");
            System.out.println("Response = " + result.asText());
            Iterator<JsonNode> it = arrayNode.iterator();
            while (it.hasNext()) {
                JsonNode n = it.next();
                Camera cam = new Camera();

                cam.name = n.get("name").asText();
                cam.friendly_name = n.get("url").asText();


                cameras.add(cam);
            }

            logger.info("response" + result);
            int status = result.get("status").asInt();
            logger.info("SearchCamera.byNodeName  end");
            if (status == 0) {
                return cameras;
            } else {

                return null;
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }


}
