package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by John on 12/2/2014.
 */
@Entity
public class Camera extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Constraints.Required
    public String friendly_name;

    @Constraints.Required
    public String node_name;

    @Constraints.Required
    public Integer camera;

    @Constraints.Required
    public String name;

    public String location_name;

    public Double latitude;

    public Double longitude;

    //@Constraints.Required
    public Integer quality;

    @Constraints.Required
    @ManyToOne
    public CameraCluster cameraCluster;

    public Date createdOn;

    public User createdBy;

    public static Finder<Long, Camera> find = new Finder(Long.class, Camera.class);

    @ManyToMany(mappedBy = "favouriteCameras")
    public List<User> users;

//    public List<ValidationError> validate() {
//        List<ValidationError> errors = new ArrayList<ValidationError>();
////        if (User.byEmail(email) != null) {
////            errors.add(new ValidationError("email", "This e-mail is already registered."));
////        }
//        return errors.isEmpty() ? null : errors;
//    }
//
//    public static Page<Camera> find(int page) {
//        return
//                find.where()
//                        .orderBy("id asc")
//                        .findPagingList(10)
//                        .setFetchAhead(false)
//                        .getPage(page);
//    }


}
