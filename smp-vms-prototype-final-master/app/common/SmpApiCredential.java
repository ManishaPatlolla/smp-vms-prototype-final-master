package common;

import play.Play;

/**
 * Created by milan on 12/18/2014.
 */
public interface SmpApiCredential {
    public static final String userName= Play.application().configuration().getString("userName");
    public static final String password= Play.application().configuration().getString("password");
}
