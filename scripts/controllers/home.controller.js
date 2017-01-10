(function () {
    'use strict';
    angular.module('app')
        .controller('homeCtrl', ['$scope', '$http', '$filter','$rootScope','MockService','$uibModal', '$location', homeCtrl])
        .controller('ModalInstanceCtrl', ['$scope', '$rootScope', ModalInstanceCtrl])

    function homeCtrl($scope, $http, $filter, $rootScope, MockService, $uibModal, $location) {

        $scope.service = new MockService($scope);
        $scope.commitmentList = [];
        
        $scope.init = function(){
          //busca todos os compromissos mas coloca apenas os com status ativo no array
            $scope.service.getAll(function (result){ 
                for(var i = 0; i < result.length; i++){ 
                    if(result[i].status == "active"){
                        $scope.commitmentList.push(result[i]);                    
                    }
                }

                $scope.list_length = $scope.commitmentList.length;

                for(var i = 0; i < $scope.list_length; i++){
                  $scope.commitmentList[i].begin_date = $scope.formatDateTime($scope.commitmentList[i].begin_date);
                  $scope.commitmentList[i].end_date = $scope.formatDateTime($scope.commitmentList[i].end_date);
                }

                $scope.count_commitment = $scope.list_length;

            });

        }
       

        $scope.formatDateTime = function(dt){ 
          //formata o begin e o end date para o formato dd/mm/aaaa
           dt = new Date(dt);
           return $filter('date')(dt,"dd/MM/yyyy HH:mm");
        }

      

        $scope.goToDetail = function(id){

            if(id != undefined)
                window.location ="#/commitment_detail/"+id
            else
                window.location ="#/commitment_detail"

        }
       

        $scope.openModal = function (item) {
          //cancela o click na coluna caso o botão seja clicado
            event.cancelBubble = true;
            if(event.stopPropagation) event.stopPropagation();
            
            //abre uma modal para confirmar se deve ser deletado
            $rootScope.modalInstance = $uibModal.open({
              templateUrl: 'views/cancel_modal.html',
              controller: ModalInstanceCtrl,
              resolve: {
               
              }
            });

            $rootScope.modalInstance.result.then(function (result) {
              //caso seja clicado o "deletar" na modal, o status do objeto selecionado passa para "inactive"
                item.status = 'inactive'; 
               $scope.service.save($scope.list, function (result){                    
                    if(result.data.msg == "success")   
                      //se retornar o status success é chamada a função inicial
                      //para buscar os novos dados do banco, deixando de mostrar o que acabou de ficar com o status inactive
                        $scope.init();               
                });
            });
          
        };

        $scope.init();
        
    };

    function ModalInstanceCtrl($scope, $rootScope) {

          $scope.ok = function () {
            $rootScope.modalInstance.close(true);
          };

          $scope.cancel = function () {
            $rootScope.modalInstance.dismiss('cancel');
          };
    };
})(); 