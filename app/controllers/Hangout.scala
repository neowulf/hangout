package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.JsArray
import java.util.UUID
import play.api.libs.json.Json

import scala.concurrent.Future
import scala.concurrent.duration._

import anorm._
import models._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import views._
import java.util.concurrent.TimeoutException
import play.api.libs.concurrent.Promise

/**
  *
  * @author siva
  */
class Hangout extends Controller {
  implicit val timeout = 10.seconds
  implicit val empJsonFormat = Json.format[Employee]

  def index = Action {
    Ok(views.html.hangout("Your new application is ready."))
  }

  object TimeoutFuture {

    def apply[A](block: => A)(implicit timeout: FiniteDuration): Future[A] = {

      val promise = scala.concurrent.Promise[A]()

      // if the promise doesn't have a value yet then this completes the future with a failure
      Promise.timeout(Nil, timeout).map(_ => promise.tryFailure(new TimeoutException("This operation timed out")))

      // this tries to complete the future with the value from block
      Future(promise.success(block))

      promise.future
    }

  }
}
