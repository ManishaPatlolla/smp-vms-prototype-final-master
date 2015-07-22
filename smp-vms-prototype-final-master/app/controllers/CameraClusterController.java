package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;
import common.HeaderAction;
import models.Camera;
import models.CameraCluster;
import play.data.validation.ValidationError;
import play.i18n.Messages;
import play.libs.Json;
import play.data.Form;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import service.CameraClusterService;
import service.CameraService;

import java.util.List;


/**
 * Created by Mani on 12/16/2014.
 */
@BodyParser.Of(BodyParser.Json.class)
@With(HeaderAction.class)
public class CameraClusterController extends Controller {

    @Inject
    private CameraClusterService cameraClusterService;

    private Form<CameraCluster> cameraClusterForm = Form.form(CameraCluster.class);

    public Result findAll(int pageSize,int pageIndex) {
        return ok(Json.toJson(cameraClusterService.findAll(pageSize,pageIndex)));
    }

    public Result get(Long id) {
        return ok(Json.toJson(cameraClusterService.findById(id)));
    }

    public Result add() {
        Form<CameraCluster> boundForm = cameraClusterForm.bindFromRequest();

        if (cameraClusterForm.hasErrors())
            return badRequest(cameraClusterForm.errorsAsJson());

        CameraCluster cameraCluster = boundForm.get();

        List<ValidationError> errors = cameraClusterService.addCameraCluster(cameraCluster);

        if (errors.size() > 0)
            return ok(Json.toJson(errors));
        else {
            ObjectNode result = Json.newObject();
            result.put("success", String.format(Messages.get("cameraCluster.addSuccess")));
            return ok(Json.toJson(cameraCluster));
        }

    }

    public Result modify(long id) {

        Form<CameraCluster> boundForm = cameraClusterForm.bindFromRequest();

        if (cameraClusterForm.hasErrors())
            return badRequest(cameraClusterForm.errorsAsJson());

        CameraCluster cameraCluster = boundForm.get();
        cameraCluster.id = id;

        List<ValidationError> errors = cameraClusterService.modifyCameraCluster(cameraCluster);

        if (errors.size() > 0)
            return ok(Json.toJson(errors));
        else {
            ObjectNode result = Json.newObject();
            result.put("success", String.format(Messages.get("cameraCluster.modifySuccess")));
            return ok(Json.toJson(result));
        }
    }


    public Result getAffectedCamerasBeforeDelete(long id) {
        CameraCluster cameraCluster = cameraClusterService.findById(id);
        if(cameraCluster != null)
        return ok(Json.toJson(cameraCluster.cameras));
        else
        return ok("Cameras are not there for this cluster.");
    }

    public Result delete(Long id) {

        List<ValidationError> errors = cameraClusterService.deleteCameraCluster(id);

        if (errors.size() > 0)
            return ok(Json.toJson(errors));
        else {
            ObjectNode result = Json.newObject();

            result.put("success", String.format(Messages.get("cameraCluster.deleteSuccess")));
            return ok(Json.toJson(result));
        }
    }
}
