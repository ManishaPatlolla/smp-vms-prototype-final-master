package smpapi;

/**
 * Created by milan on 12/18/2014.
 */
public interface AuthenticationApi {

    /**
     *
     * @param userName
     * @param password
     * @return authToken
     */
    public String login(String userName,String password);

}
