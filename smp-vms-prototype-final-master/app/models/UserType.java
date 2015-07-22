package models;

import common.UserTypeEnum;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by milan on 12/16/2014.
 */
@Entity
public class UserType extends Model{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Enumerated(EnumType.ORDINAL)
    public UserTypeEnum user_type;

    @OneToMany(mappedBy = "userType")
    public List<User> users;

    public static Finder<Long, UserType> find = new Finder(Long.class, UserType.class);



}
