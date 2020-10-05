import React from 'react'

const Login = () => {
  return (
    <div id="login-body">
      <div className="container login-container">
        <hr />
        <div className="row">
          <aside className="col-sm-11 col-lg-8 col-xl-6">
            <h4 className="card-title mb-4 mt-1">iCrowdTask Login</h4>
            <div className="card">
              <article className="card-body">
                <a className="float-right btn btn-outline-primary" type="button" name="createUser" id="createUser">Sign up</a>
                <h4 className="card-title mb-4 mt-1 ml-0" style="text-align: left;">Sign in</h4>
                <form method="post" id="login-form" name="login-form" enctype="multipart/form-data">
                  <div className="form-group">
                    <label>Your email</label>
                    <input name="email" className="form-control" placeholder="Email" type="email" autocomplete="email" />
                  </div>
                  <div className="form-group">
                    <a className="float-right" href="/">Forgot?</a>
                    <label>Your password</label>
                    <input className="form-control" placeholder="******" type="password" name="password" autocomplete="current-password" />
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <label> <input type="checkbox" id="save-password" name="save-password" /> Save password </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" value="submit" name="submit" className="btn btn-primary btn-block"> Login  </button>
                  </div>
                  <div className="googleSigninDiv mt-5">
                    <a href="/auth/google/"><img id="googleSigninButton" alt="Google Login" src="/images/btn_google_signin_light.png" /></a>
                  </div>
                </form>
              </article>
            </div>
          </aside>
        </div>
      </div>
      <script src="public/scripts/login.js"></script>
    </div>
  )
}

export default Login
