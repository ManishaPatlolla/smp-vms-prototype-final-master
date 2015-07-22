package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by milan on 12/16/2014.
 */
@Entity
public class User extends Model{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Constraints.Email
    public String email;

    @Constraints.Required
    public String user_name;

    @Constraints.Required
    public String first_name;

    @Constraints.Required
    public String last_name;

    public Date last_login;

    public Date creation_date;

    public Boolean active;

    @Constraints.Required
    public String password;

    public Integer phone;

    @ManyToOne
    public UserGroup userGroup;

    @ManyToOne
    public UserType userType;

    @ManyToMany
    public List<Camera> favouriteCameras;

    public static Finder<Long, User> find = new Finder(Long.class, User.class);


}
