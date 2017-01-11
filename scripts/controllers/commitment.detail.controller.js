(function () {
    'use strict';
    angular.module('app')
        .controller('commitmentDetailCtrl', ['$scope', '$http', '$filter','$rootScope','MockService', '$routeParams',commitmentDetailCtrl])
      

    function commitmentDetailCtrl($scope, $http, $filter, $rootScope, MockService, $routeParams) {

        $scope.service = new MockService($scope);
       
        $scope.init = function(){
            //pega id passado por parâmetro
            $scope.id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
            //se tiver id, busca por id no banco
            if($scope.id != 'commitment_detail'){
                $scope.service.getById($scope.id, function (result){ 
                    $scope.commitment = result;  
                    //no mockable.io não é possível retornar o resultado por id, então fiz um for em toda a lista para buscar por id
                    for(var i = 0; i < $scope.commitment.length; i++){
                        if($scope.commitment[i].id == $scope.id){
                            //inicializa as variáveis de acordo com o resultado encontrado, já separando o begin e o end date em uma variavel para data e outra para hora
                            $scope.title = $scope.commitment[i].title;
                            $scope.detail = $scope.commitment[i].detail;
                            $scope.begin_date = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].begin_date)).split(" ")[0].replace(/"/, ""); 
                            $scope.begin_time = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].begin_date)).split(" ")[1].replace(/"/, "");
                            $scope.end_date = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].end_date)).split(" ")[0].replace(/"/, "");
                            $scope.end_time = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].end_date)).split(" ")[1].replace(/"/, "");
                        }
                    }                 
                });
            }            
        }

        $scope.formatDateTime = function(dt){ 
            //formata a data do banco (yyyy-mm-dd) para dd/mm/aaaa
           dt = new Date(dt);
           return $filter('date')(dt,"dd/MM/yyyy HH:mm");
        }

        $scope.verify = function(){

            $scope.canSave = true;
            $scope.title_error = false;
            $scope.begin_date_error = false;
            $scope.begin_time_error = false;
            $scope.end_date_error = false;
            $scope.end_time_error = false;

            if(!$scope.isSet($scope.title)){
                $scope.alert_field = "O campo título é obrigatório"
                $scope.title_error = true;
                $scope.is_not_saved = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.begin_date)){
                $scope.alert_field = "O campo data de início é obrigatório"
                $scope.begin_date_error = true;
                $scope.is_not_saved = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.verifyIfDateIsCorrect($scope.begin_date)){
                $scope.alert_field = "Data Incorreta"
                $scope.begin_date_error = true;
                $scope.is_not_saved = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.begin_time)){
                $scope.alert_field = "O campo horário de início é obrigatório"
                $scope.begin_time_error = true;
                $scope.is_not_saved = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.verifyIfTimeIsCorrect($scope.begin_time)){
                $scope.show_alert = true;
                $scope.alert_field = "Horário incorreto"
                $scope.is_not_saved = true;
                $scope.canSave = false;
                $scope.begin_time_error = true;
            }else if(!$scope.isSet($scope.end_date)){
                $scope.alert_field = "O campo data de término é obrigatório"
                $scope.is_not_saved = true;
                $scope.end_date_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.verifyIfDateIsCorrect($scope.end_date)){
                $scope.alert_field = "Data Incorreta"
                $scope.end_date_error = true;
                $scope.is_not_saved = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.end_time)){
                $scope.alert_field = "O campo horário de término é obrigatório"
                $scope.is_not_saved = true;
                $scope.end_time_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.verifyIfTimeIsCorrect($scope.end_time)){
                $scope.show_alert = true;
                $scope.is_not_saved = true;
                $scope.alert_field = "Horário incorreto"
                $scope.canSave = false;
                $scope.end_time_error = true;
            }
            //só salva se não houverem erros
            if($scope.canSave == true){
                $scope.save();
            }
        }

        $scope.verifyIfTimeIsCorrect = function(time){
            //verfica se o horário digitado está correto
            var regexp = /([01][0-9]|[02][0-3]):[0-5][0-9]/;
            return regexp.test(time)

        }

        $scope.verifyIfDateIsCorrect = function(dateString){  
            // First check for the pattern
            if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){ 
                return false;
            }

            // Parse the date parts to integers
            var parts = dateString.split("/");
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);

            // Check the ranges of month and year
            if(year < 1000 || year > 3000 || month == 0 || month > 12){
                return false;
            }

            var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

            // Adjust for leap years
            if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                monthLength[1] = 29;

            // Check the range of the day
           
            return day > 0 && day <= monthLength[month - 1];
        };

        $scope.save = function(){
           //objeto é criado com as variáveis
            $scope.list = {
                            title : $scope.title,
                            begin_date : $scope.setDbDateTime($scope.begin_date, $scope.begin_time),
                            end_date : $scope.setDbDateTime($scope.end_date, $scope.end_time),
                            detail : $scope.detail
                          }
            if($scope.id != 'commitment_detail'){
                $scope.list.id = $scope.id;
            }
           
            $scope.service.save($scope.list, function (result){                    
                    if(result.data.msg == "success"){
                        $scope.is_saved = true;
                        $scope.show_alert = true;
                        $scope.alert_field = "Salvo!"
                        setTimeout(function(){ window.location ="/"; }, 1000);
                        
                    }
            });
                         
        }

        $scope.setDbDateTime = function(date, time){
            //data formatada para o formado de data do banco de dados
           date = date.split("/");           
           var dt = new Date(date[2], date[1]-1, date[0]); 
           return $filter('date')(dt, "yyyy-MM-dd") + " "+ time;
        }
        
        $scope.goToHome = function(){ 
            window.location ="/"
        }

        $scope.isSet = function(variable){
            if(variable == undefined || variable == '' || variable == null)
                return false
            else
                return true
        }

        $scope.init();
      

        
    }
})(); 