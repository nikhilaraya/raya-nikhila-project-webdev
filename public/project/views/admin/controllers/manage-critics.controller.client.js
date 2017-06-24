(function () {
    angular
        .module("MoviesSite")
        .controller("manageCriticsController",manageCriticsController);

    function manageCriticsController(apiMoviesService,
                                   $rootScope,
                                   $location,
                                   $sce,
                                   userService,
                                   movieService){


        var model = this;
        model.logout = logout;
        model.createCritic = createCritic;
        model.updateCritic = updateCritic;
        model.deleteCritic = deleteCritic;

        function init() {
            getLoggedInUser();
            findAllCritics();
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function (response) {
                        $location.url("/home");
                    },
                    function () {
                        $location.url("/home");
                    });
        }

        function createCritic(username,password,email) {
            var user={
                username: username,
                password: password,
                email: email,
                admin: false,
                critic : true
            };

            userService
                .createUser(user)
                .then(function (response) {
                    model.createsuccess = "Created the user successfully";
                    userService
                        .findAllCritics()
                        .then(function (response) {
                            model.users = response.data;
                            model.userCount = model.users.length;
                        });
                });
        }

        function deleteCritic(userId) {
            userService
                .deleteUser(userId)
                .then(function (response) {
                    model.warning = "User deleted successfully";
                    model.createsuccess = null;
                    userService
                        .findAllCritics()
                        .then(function (response) {
                            model.users = response.data;
                            model.userCount = model.users.length;
                        });
                })
        }

        function updateCritic(userId,user) {
            userService
                .updateUser(userId,user)
                .then(
                    function (response) {
                        model.updatedmessage = "updated Successfully";
                        userService
                            .findAllCritics()
                            .then(function (response) {
                                model.users = response.data;
                                model.userCount = model.users.length;
                            });
                    });
        }

        function findAllCritics() {
            userService
                .findAllCritics()
                .then(function (response) {
                    model.users = response.data;
                    model.userCount = model.users.length;
                });
        }

        function getLoggedInUser() {
            if($rootScope.currentUser){
                model.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;
            }
            else
            {
                model.notloggedIn = "true";
            }
        }
    }

})();