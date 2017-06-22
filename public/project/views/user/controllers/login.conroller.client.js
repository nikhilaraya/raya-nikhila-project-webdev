(function () {
    angular
        .module("MoviesSite")
        .controller("loginController", loginController);

    function loginController($location,userService) {
        var model = this;
        model.login = function (username,password) {

            if(model.loginForm.$valid == false)
            {
                model.error = "Please fill in the username and password";
                model.alert = "* Enter the required fields";
            }
            else
            {
                userService
                    .login(username,password)
                    .then(function(response){
                        var user = response.data;
                        if(user._id){
                            $location.url("/profile");
                        }
                        else
                        {
                            model.error = "Invalid Credentials";
                        }
                    });
            }
        }
    }
})();
