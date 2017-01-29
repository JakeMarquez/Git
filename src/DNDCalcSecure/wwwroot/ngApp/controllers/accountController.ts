namespace DNDCalcSecure.Controllers {

    export class AccountController {
        public externalLogins;
        public state;
        public equipmentActive = true;
        public editbox(){
            this.equipmentActive = false;
            return "okay!";
        }
        public getUserName() {
            return this.accountService.getUserName();
        }

        public getClaim(type) {
            return this.accountService.getClaim(type);
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
            this.$location.path('/');
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }

        constructor(private accountService: DNDCalcSecure.Services.AccountService,
                    private $location: ng.ILocationService) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
        }
    }

    angular.module('DNDCalcSecure').controller('AccountController', AccountController);


    export class LoginController {
        public loginUser;
        public validationMessages;
        public stateActive;
        public icons = {
            "Microsoft": "fa fa-windows",
            "Twitter": "fa fa-twitter-square",
            "Google":  "fa fa-google-plus-square"
        }

        public closeValidation(index) {
            this.validationMessages.splice(index, 1);
        }

        public login() {
            this.accountService.login(this.loginUser).then(() => {
                this.$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        public usernameCheck(username) {
          
             var answer =this.accountService.checkExistence(username)
            console.log('output: ' +  answer);
            return answer;
        }

      
        constructor(private accountService: DNDCalcSecure.Services.AccountService,
            private $location: ng.ILocationService, ) {
        }
    }


    export class RegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        public closeValidation(index) {
            console.log(index);
            this.validationMessages.splice(index, 1);
            console.log(this.validationMessages);
        }

        constructor(private accountService: DNDCalcSecure.Services.AccountService, private $location: ng.ILocationService) { }
    }





    export class ExternalRegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        public closeValidation(index) {
            console.log(index);
            this.validationMessages.splice(index, 1);
            console.log(this.validationMessages);
        }

        constructor(private accountService: DNDCalcSecure.Services.AccountService, private $location: ng.ILocationService) {}

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(
            private accountService: DNDCalcSecure.Services.AccountService,
            private $http: ng.IHttpService,
            private $stateParams: ng.ui.IStateParamsService,
            private $location: ng.ILocationService
        ) {
            let userId = $stateParams['userId'];
            let code = $stateParams['code'];
            accountService.confirmEmail(userId, code)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }
    }

}
