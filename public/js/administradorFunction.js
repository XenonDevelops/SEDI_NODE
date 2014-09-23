var appAdministrador = angular.module("appAdministrador", ['ui.bootstrap','angularFileUpload']);
//var socket = io();

appAdministrador.controller('administrador',function($scope,$http,$upload){

	$scope.periodos=[];
	$scope.meses=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
	$scope.annos=[];
	$scope.archivoCargado=false;
	$scope.nombreArchivoCargado;
		
	for (var i = 2012; i < 2017; i++) {
		$scope.annos.push(i+"");
	};

    $http({method: 'GET',url:'/periodos'}).
            success(function(data, status, headers, config) {
                $scope.periodos = data;
            }).
            error(function(data, status, headers, config) {
                console.log('error');
            });	


    $scope.newPeriodo = function($scope){
		 $http({method : 'POST',
		 		data   : {
		 					mesInicio : $scope.mesInicio,
		 					mesFin: $scope.mesFin,
		 					anno : $scope.anno
		 		},
		 		url    : '/periodos'}).
	            success(function(data, status, headers, config) {
	            	console.log(data);
	            	window.location.reload();
	            }).
	            error(function(data, status, headers, config) {
	            	console.log('error');
	            });	
    }

    $scope.newAspirantes = function($event){
    	$event.preventDefault();
	    $event.stopPropagation();

    	var fechaInicioEvaluacion=(($scope.dt).toJSON()).substr(0,10);
    	var fechaFinEvaluacion=(($scope.dt2).toJSON()).substr(0,10);
    	
    	$http({method:'POST',
    			data:{
    				fechaInicioEvaluacion : fechaInicioEvaluacion,
    				fechaFinEvaluacion    : fechaFinEvaluacion,
    				periodoInduccion      : $scope.periodoInduccion,
    				nombreExcel			  : $scope.nombreArchivoCargado
    			},
    			url:'/aspirantes'}).
    	success(function(data,status,headers,config){
    		console.log('success'+data);
    	}).
    	error(function(data,status,headers,config){
    		console.log('error');
    	});
    }

	$scope.onFileSelect = function($files) {
		$scope.uploading=false;
		$scope.mensajeUploading=0;
		$scope.uploadStatusPorcent=0;

	    for (var i = 0; i < $files.length; i++) {
		    var file = $files[i];
		    $scope.upload = $upload.upload({
		        url: '/cargaExcel',
		        method: 'POST',
		        headers: {'Content-Type': 'multipart/form-data'},
		        file: file,
		    }).progress(function(evt) {
		      	$scope.uploading=true;
		      	$scope.uploadStatusPorcent=parseInt(100.0 * evt.loaded / evt.total);
		      	$scope.mensajeUploading=parseInt(100.0 * evt.loaded / evt.total)+"% Completado";
		    }).success(function(data, status, headers, config) {
		      	$scope.archivoCargado=true;
		      	$scope.nombreArchivoCargado=data.random+''+data.nombreArchivo;
		      	if (data.nombreArchivo) {
		      		$scope.mensajeUploading=data.nombreArchivo+' cargado completamente';
		      	}else{
		      		$scope.mensajeUploading=data;
		      	}
		    }).error(function(data, status, headers ,config){
		      	$scope.archivoCargado=false;
		      	$scope.mensajeUploading=data;
		    });
	    }
	}



    //CALENDARIO 1
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.initDate = new Date('2016-15-20');
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];

	  //CALENDARIO 2
	  $scope.today2 = function() {
	    $scope.dt2 = new Date();
	  };
	  $scope.today2();

	  $scope.clear2 = function () {
	    $scope.dt2 = null;
	  };

	  // Disable weekend selection
	  $scope.disabled2 = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin2 = function() {
	    $scope.minDate2 = $scope.minDate2 ? null : new Date();
	  };
	  $scope.toggleMin2();

	  $scope.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened2 = true;
	  };

	  $scope.dateOptions2 = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.initDate2 = new Date('2016-15-20');
	  $scope.formats2 = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format2 = $scope.formats2[0];
});


/*
//CLIENTE
var username ='Angel'
var socket=io.connect('http://localhost:8000');
socket.on('connect',function(socket){
	window.user={
		id:client.socket.sessionid,
		username:username,
		session:data.cookiesessionid
	}
	client.emit('app_user',user);
});

SERVER
var io=require('socket.io').listen(80);
var app_users={};

io.sockets.on('app_user')*/