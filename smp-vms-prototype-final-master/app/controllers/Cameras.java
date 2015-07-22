package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;
import common.HeaderAction;
import models.Camera;
import play.data.Form;
import play.data.validation.ValidationError;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import service.CameraService;

import java.util.List;

/**
 * Created by milan on 12/9/2014.
 */
@BodyParser.Of(BodyParser.Json.class)
@With(HeaderAction.class)
public class Cameras extends Controller {

    @Inject
    private  CameraService cameraService;

    private  Form<Camera> cameraForm = Form.form(Camera.class);

    /**
     * Need to be revised. This code will be moved to Service
     * @param search
     * @return
     */
    public  Result findAll(String search) {

            return ok(Json.toJson(cameraService.search(search)));
//        if (search.equals("_all")) {
//            List<Camera> cameraList = cameraService.findAll();
//            return ok(Json.toJson(cameraList));
//        } else {
//            List<Camera> cameraList = cameraService.findByCameraName(search);
//            return ok(Json.toJson(cameraList));
//        }
    }

    // get information for a specific camera
    public  Result get(Long id) {
        return ok(Json.toJson(cameraService.findById(id)));
    }


    public  Result add() {
        // retrieve json from the request body
        JsonNode json = request().body().asJson();

        Form<Camera> boundForm = cameraForm.bind(json);
        if (boundForm.hasErrors()) {
            //flash("error", "Please correct the form below.");
            return badRequest(boundForm.errorsAsJson());
        }

        Camera camera = boundForm.get();

        List<ValidationError> errors = cameraService.addCamera(camera);

        // camera.save();
//        flash("success",
//                String.format("Successfully added camera %s", camera));

        if (errors.size() > 0)
            return ok(Json.toJson(errors));
        else {
            ObjectNode result = Json.newObject();

            result.put("success", String.format(Messages.get("camera.addSuccess")));
            return ok(Json.toJson(result));
        }


    }


    public   Result update(Long id) {
        Form<Camera> boundForm = cameraForm.bindFromRequest();
        if (boundForm.hasErrors()) {
            //flash("error", "Please correct the form below.");
            return badRequest(boundForm.errorsAsJson());
        }
        Camera camera = boundForm.get();
        camera.id=id;

        List<ValidationError> errors = cameraService.updateCamera(camera);

        if (errors.size() > 0)
            return ok(Json.toJson(errors));
        else {
            ObjectNode result = Json.newObject();

            result.put("success", String.format(Messages.get("camera.updateSuccess")));
            return ok(Json.toJson(result));
        }
    }


    public   Result delete(Long id) {

        List<ValidationError> errors = cameraService.deleteCamera(id);

        if (errors.size() > 0)
            return ok(Json.toJson(errors));
        else {
            ObjectNode result = Json.newObject();

            result.put("success", String.format(Messages.get("camera.deleteSuccess")));
            return ok(Json.toJson(result));
        }

    }
}
