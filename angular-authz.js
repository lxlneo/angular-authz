'use strict';
    angular.module('angular-authz', []);
    angular.module('angular-authz').factory('permissionService', function () {
         var permission = {};
        permission.inited = false;
        permission.data  = new Map();
        permission.init = function(permissionList){
            permission.data.clear();
            if(window.localStorage){
                window.localStorage.setItem("permission",JSON.stringify(permissionList))
            }else{
                console.error("初始化权限错误!","不支持window.localStorage");
            }
        }
        permission.buildData = function(){
            var permissionList = [];
            if(window.localStorage){
                permissionList = JSON.parse(window.localStorage.getItem("permission"));
            }else{
                console.error("初始化权限错误!","不支持window.localStorage");
            }
            if(permissionList instanceof Array){
                angular.forEach(permissionList,function(ele,index){
                    if(ele && ele.key && ele.value){
                        permission.data.set(ele.key,ele.value)
                    }
                })
                permission.inited = true;
            }else{
                console.error("初始化权限错误!权限格式不对");
            }
        }
        permission.hasSingle = function(permissionName){
            return permission.data.has(permissionName);
        }

        permission.hasArray = function(permissionName){
            var array = []
            if("&&".indexOf(permissionName) > -1){
               array =  permissionName.split("&&");
               var i = 0,size=array.length,result =true;
               while(i<size){
                  if(!permission.hasSingle(array[i])){
                      result =  false;
                      break;
                  }
                  i++;
               }
                return result;
            }
            if("||".indexOf(permissionName) > -1){
                array =  permissionName.split("||");
                var i = 0,size=array.length,result =false;
                while(i<size){
                    if(permission.hasSingle(array[i])){
                        result =  true;
                        break;
                    }
                    i++;
                }
                return result;
            }
        }
        permission.has = function(permissionName){
            if(!permission.inited){
                permission.buildData();
            }
            return permissionName && (permissionName.indexOf("&&")>0 || permissionName.indexOf("||")>0) ?  permission.hasArray(permissionName) :permission.hasSingle(permissionName);
        }
        return permission;
    });

    angular.module('angular-authz').directive('hasPermission', [
        'permissionService',
        function (permissionService) {
            return {
                priority: 1000,
                restrict: 'A',
                compile: function (element, attr) {
                    return function ($scope, $element, $attr) {
                        var permission = $attr.hasPermission;
                        if(!permissionService.has(permission)){
                            angular.element($element).remove();
                        }
                    };
                }
            };
        }
    ]);
