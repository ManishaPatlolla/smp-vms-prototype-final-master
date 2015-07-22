package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by milan on 12/16/2014.
 */
@Entity
public class AccessRight extends Model{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Constraints.Required
    String accessRight;

    @ManyToMany(mappedBy = "accessRights")
    public List<CameraAccessProfile> cameraAccessProfiles;

    public static Finder<Long, AccessRight> find = new Finder(Long.class, AccessRight.class);


}
