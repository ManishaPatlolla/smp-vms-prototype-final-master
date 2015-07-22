import com.avaje.ebean.Ebean;
import com.google.inject.Guice;
import com.google.inject.Injector;
import guice.PlayModule;
import models.Camera;
import play.Application;
import play.GlobalSettings;
import play.libs.Yaml;

import java.util.List;
import java.util.Map;

/**
 * Created by milan on 12/9/2014.
 */
public class Global extends GlobalSettings {

    private Injector injector;

    @Override
    public void onStart(Application application) {
        super.onStart(application);
        injector = Guice.createInjector(new PlayModule());
        InitialData.insert(application);
    }

    @Override
    public <A> A getControllerInstance(Class<A> aClass) throws Exception {
        return injector.getInstance(aClass);
    }

    static class InitialData {

        public static void insert(Application app) {
            if(Ebean.find(Camera.class).findRowCount() == 0) {
                Ebean.save((List<?>) Yaml.load("initial-data.yml"));
//                Map<String,List<Object>> all = (Map<String,List<Object>>) Yaml.load("initial-data.yml");
//
//                Ebean.save(all.get("cameras"));

            }
        }

    }
}
