schedulerApp.factory('Reservation', ['$resource', function ($resource) {
    //signature: $resource(url, [paramDefaults], [actions], options);
    return $resource('http://localhost:8080/Spring4MVCAngularJSNgResourceExample/reservation/:id',
            {},//parameters
            {
                update: { //I insert PUT because it is not supported (continue reading below)
                    method: 'PUT' // To send the HTTP Put request when calling this custom update method.
                }

            },
            {
                stripTrailingSlashes: false
            }
    );
    /*
     'get':    {method:'GET'},
     'save':   {method:'POST'},
     'query':  {method:'GET', isArray:true},
     'remove': {method:'DELETE'},  //Preferable over delete due to IE incompatibilities.
     'delete': {method:'DELETE'}
     */
}]);