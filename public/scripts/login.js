
document.getElementById("createUser").onclick = () => {
  location.href = "/api/reqsignup/"
}

// Get form's DOM object
const passwordCheck = document.getElementById("save-password")
var loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', ev => {

  // Stop submitting form by itself
  ev.preventDefault()


  const XHR = new XMLHttpRequest()

  const form = document.getElementById('login-form')
  const FD  = new FormData(form)

  // Define what happens in case of error
  XHR.addEventListener('error', function(ev) {
    alert('Oops! Something went wrong.')
  })

  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4) {
      if (XHR.status == 200) {
        if (passwordCheck.checked && window.PasswordCredential) {
          const password = loginForm.password.value
          const email = loginForm.email.value
          var cred = new PasswordCredential({
            id: email,
            password: password,
            email: email,
            iconURL: window.location.href
          })
          navigator.credentials.store(cred).then(function() {
             alert('Login successful.')
          })
        } else {
          alert('Login successful.')
        }
        window.location.href = `${window.location.origin}/`
      } else {
        alert('Sign in credentials were not correct.')
      }
    }
  }

  // Set up our request
  XHR.open('POST', '/api/reqlogin/')

  // Send our FormData object. HTTP headers are set automatically
  XHR.send(FD)

})
