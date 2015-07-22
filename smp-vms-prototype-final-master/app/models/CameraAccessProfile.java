package models;

import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by milan on 12/16/2014.
 */
@Entity
public class CameraAccessProfile extends Model{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @OneToOne
    public CameraCluster cameraCluster;

    @OneToOne
    public UserGroup userGroup;

    @ManyToMany
    public List<AccessRight> accessRights;

    public static Finder<Long, CameraAccessProfile> find = new Finder(Long.class, CameraAccessProfile.class);
}
