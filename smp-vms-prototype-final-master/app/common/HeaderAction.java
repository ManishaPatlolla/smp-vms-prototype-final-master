package common;

import play.Logger;
import play.core.j.JavaResultExtractor;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;

/**
 * Created by milan on 12/19/2014.
 */
public class HeaderAction extends Action.Simple {

    @Override
    public F.Promise<Result> call(Http.Context ctx) throws Throwable {
        ctx.response().setHeader("Access-Control-Allow-Origin", "*");
        ctx.response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return delegate.call(ctx);
    }
}