package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by milan on 12/16/2014.
 */
@Entity
public class UserGroup extends Model{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Constraints.Required
    public String name;

    @OneToOne(mappedBy = "userGroup")
    public CameraAccessProfile cameraAccessProfile;

    @OneToMany(mappedBy = "userGroup")
    public List<User> users;

    public static Finder<Long, UserGroup> find = new Finder(Long.class, UserGroup.class);

}
