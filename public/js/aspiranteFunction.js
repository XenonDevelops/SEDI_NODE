/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var myapp = angular.module("myapp", []);

myapp.controller("MyController", function($scope, $http) {

    $scope.profesoresMaterias = {};
    $scope.nombreUsuarioCon;
    $scope.carreraUsuarioCon;
    $scope.preguntas          = [];
    $scope.encuestaNoInciada  = true;
    $scope.encuestaEnCurso    = false;
    $scope.encuestaTerminada  = false;
    $scope.btnHabilitado      = true;
    $scope.pregunta;

    //SE EJECUTA CUANDO CARGA EL SCRIPT -> carga preguntas
    var pathname = window.location.pathname;
    var arr      = pathname.split('/');

    //**********EXTRAE NOMBRE Y CARRERA DEL USUARIO
    
    $http({method: 'get',url: arr[1] + '/preguntas'}).
            success(function(data, status, headers, config) {
                var temp         = data;
                $scope.preguntas = data;
                $scope.pregunta  = $scope.preguntas[0];
                console.log($scope.pregunta);

                $http({
                    method: 'get',
                    url: '/carreras'
                }).
                        success(function(data, status, headers, config) {
                            var temp              = data.split(',');
                            $scope.nombreUsuario  = temp[0];
                            $scope.carreraUsuario = temp[1];
                        }).
                        error(function(data,status,headers,config){
                            console.log('error ConsultaNombreCarrera');
                        });

                //*********************************//////////
            }).
            error(function(data, status, headers, config) {
                console.log('error');
            });

    //*****->consulta profesores y materias del alumno
    $scope.consultaProfes = function() {
        $scope.encuestaNoInciada = false;
        var pathname             = window.location.pathname;
        var arr                  = pathname.split('/');

        $http(
                {
                    method: 'get',
                    url: arr[1] + '/profesoresMaterias'
                }).
                success(function(data, status, headers, config) {
                    $scope.profesoresMaterias = data;
                    $scope.encuestaEnCurso    = true;
                    console.log($scope.profesoresMaterias);
                }).
                error(function(data, status, headers, config) {
                    console.log('error');
                });
    }
    //**********************

    //*****-> Envia calificaciones para guardarlo en la bd
    $scope.enviaCalificacion = function() {
        var pathname = window.location.pathname;
        var arr      = pathname.split('/');
        $scope.listaRespuesta = [];
        var resProfesMaterias = $scope.profesoresMaterias;
        var bandera           = false;
        var seleccionado      = false;
        var cont              = 0;
        $scope.btnHabilitado  = false;

        angular.forEach(resProfesMaterias, function(profesorMateria, key) {
            console.log(resProfesMaterias.length);
            var nameRadio = 'resp' + profesorMateria.profesor._id;
            var radioValores = document.getElementsByName(nameRadio.toString());
            var radioSeleccionado;
            for (i = 0; i < radioValores.length; i++) {
                if (radioValores[i].checked) {
                    radioSeleccionado = radioValores[i].value;
                    cont++;
                    i = radioValores.length + 1;
                }
            }

            $scope.listaRespuesta.push({
                idProfesor: profesorMateria.profesor._id,
                calificacion: radioSeleccionado
            });
        });

        seleccionado = cont == resProfesMaterias.length ? true : false;

        bandera    = true;
        var parame = JSON.stringify($scope.listaRespuesta);
        var urlPet = arr[1] + '/calificaciones';

        if (bandera && seleccionado) {
            $http({
                method: 'POST',
                data:{
                    listaRespuesta:$scope.listaRespuesta
                },
                url: urlPet
            }).
                    success(function(data, status, headers, config) {
                        bandera = false;


                        angular.forEach(resProfesMaterias, function(profesorMateria, key) {
                            var nameRadio    = 'resp' + profesorMateria.profesor._id;
                            var radioValores = document.getElementsByName(nameRadio.toString());
                            //PONEMOS EN FALSE LOS RADIO BUTTON QUE SELECCIONARON
                            for (i = 0; i < radioValores.length; i++) {
                                if (radioValores[i].checked) {
                                    console.log(radioValores[i].checked = false);
                                }
                            }
                        });


                        if ($scope.preguntas.length > 1) {
                            $scope.preguntas = $scope.preguntas.splice(1, $scope.preguntas.length);
                            $scope.pregunta  = $scope.preguntas[0];
                            $scope.closeAlert(0);
                        } else {
                            $scope.encuestaEnCurso   = false;
                            $scope.encuestaTerminada = true;
                            $scope.addAlertSuccess();
                            window.setTimeout(function() {
                                window.location = "/logout"//ejecutamos el action para redirigir
                                $scope.closeAlert(0);
                            }, 500); //tiempo en milisegundos
                        }

                        $scope.btnHabilitado = true;
                    }).
                    error(function(data, status, headers, config) {
                        bandera = false;
                        $scope.btnHabilitado = true;
                    });
        } else {
            //            alert("Por favor, elige una calificación");
            $scope.btnHabilitado = true;
            $scope.addAlertError();
        }
    }
    //************************************

    $scope.alerts = [];

    $scope.addAlertError = function() {
        $scope.closeAlert(0);
        $scope.alerts.push({
            type: 'alert alert-error',
            msg: 'Contesta todas las preguntas.'
        });
    };
    $scope.addAlertSuccess = function() {
        $scope.closeAlert(0);
        $scope.alerts.push({
            type: 'alert alert-info',
            msg: 'Gracias por hacer la evaluación.'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});




    