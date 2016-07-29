var today = moment();

//routing (partials) handling
schedulerApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/week/:year/:month/:day', {
        templateUrl: 'partials/week.jsp',
        controller: 'WeekController'
    });
    $routeProvider.when('/week/', {
        templateUrl: 'partials/week.jsp',
        controller: 'WeekController'
    });
    $routeProvider.when('/agenda/:year/:month/:day', {
        templateUrl: 'partials/agenda.jsp',
        controller:  'AgendaController'
    });
    $routeProvider.when('/agenda', {
        templateUrl: 'partials/agenda.jsp',
        controller:  'AgendaController'
    });
    $routeProvider.when('/users', {
        templateUrl: 'users'
    });
    $routeProvider.when('/login', {
        templateUrl: 'login'
    });
    $routeProvider.when('/logout', {
        templateUrl: 'logout'
    });
    $routeProvider.when('/registration', {
        templateUrl: 'registration'
    });
    $routeProvider.otherwise({redirectTo: '/week/0/0/0'});
}]);

//directive example
/*
 schedulerApp.directive('bookingCell', function() {
 return {
 restrict: 'AE',
 replace: 'true',
 template: '<td></td>',
 link: function(scope, elem, attrs) {

 }
 };
 });
 */

//controller Agenda
schedulerApp.controller('AgendaController', ['$scope', 'Reservation', '$rootScope', '$routeParams', '$location', '$http',

    function ($scope, Reservation, $rootScope, $routeParams, $location, $http) {
        //loading reservation from server REST
        //GET REST on reservations of an user
	
		$http.get('http://localhost:8080/Spring4MVCAngularJSNgResourceExample/agenda/').
        success(function(data) {

        /*
        var self = this;
        self.reservation = new Reservation();
        self.reservations = [];
        //self.fetchAllReservations = function(){
        self.reservations = Reservation.query();
        self.reservations.$promise.then(function () {
		*/
            //$scope.reservations = data;
            $scope.reservations = data;
            //$routeProvider.when('/week/:year/:month/:day', ...
            var year_requested2 = $routeParams.year;
            var month_requested2 = $routeParams.month;
            var day_requested2 = $routeParams.day;
            var year_requested = $rootScope.year;
            var month_requested = $rootScope.month;
            var day_requested = $rootScope.day;
            if (year_requested2 != null && year_requested2 != 0 && month_requested2 != null && month_requested2 != 0 && day_requested2 != null && day_requested2 != 0) {
                var header = document.getElementById('bookings_starting_from');
                today = moment(year_requested2 + "-" + month_requested2 + "-" + day_requested2);
                header.innerHTML = "BOOKINGS FROM DAY " + day_requested2 + "-" + month_requested2 + "-" + year_requested2;
                $location.path('/agenda/' + year_requested2 + "/" + month_requested2 + "/" + day_requested2);
                $rootScope.year = year_requested2;
                $rootScope.month = month_requested2;
                $rootScope.day = day_requested2;
            }
            else {
                if (year_requested != null && year_requested != 0 && month_requested != null && month_requested != 0 && day_requested != null && day_requested != 0) {
                    var header = document.getElementById('bookings_starting_from');
                    today = moment(year_requested + "-" + month_requested + "-" + day_requested);
                    header.innerHTML = "BOOKINGS FROM DAY " + day_requested + "-" + month_requested + "-" + year_requested;
                    $location.path('/agenda/' + year_requested + "/" + month_requested + "/" + day_requested);
                }
                else
                    today = moment();
            }

            //take reservations starting from today
            //USING RETURNED $scope.reservations, but fields are different
            var reservations_from_today = new Array();
            for (var i = 0; i < $scope.reservations.length; i++) {
                var booking_moment = moment(moment($scope.reservations[i].reservation_date, 'YYYY-MM-DD HH').format('ddd D/MM YYYY HH'), 'ddd D/MM YYYY HH');
                var booking_year = booking_moment.year();
                var booking_day_of_year = booking_moment.dayOfYear();
                if (booking_year == today.year() && booking_day_of_year >= today.dayOfYear()) {
                    reservations_from_today.push($scope.reservations[i]);
                }
            }

            //sort the array with lodash by field "time"
            /*
             $scope.reservations_from_today = _.sortBy(reservations_from_today, "time");
             OR
             $scope.reservations_from_today = _.sortBy(reservations_from_today, 'time', function(o) {
             return moment(o.reservation_date, "ddd D/MM YYYY HH");
             });
             */

            $scope.reservations_from_today = reservations_from_today.sort(function (a, b) {
                var i = moment(moment(a.reservation_date, 'YYYY-MM-DD HH').format('ddd D/MM YYYY HH'), 'ddd D/MM YYYY HH');
                var j = moment(moment(b.reservation_date, 'YYYY-MM-DD HH').format('ddd D/MM YYYY HH'), 'ddd D/MM YYYY HH');
                if (i.valueOf() < j.valueOf()) return -1;
                if (i.valueOf() > j.valueOf()) return 1;
                return 0;
            });
        });
        //};
        //$scope.reservations_from_today.reverse();
        /*
         })
         .error(function(){
         console.log("There was an error while communicating with the server");
         });
         */
        //delete_reservation
        /*
         $scope.delete_reservation = function (o) {
         delReservation(o, $scope, $http);
         }
         */
        $scope.delete_reservation = function (identity) {
            /*
            for (i = 0; i < $scope.reservations_from_today.length; i++) {
                if ($scope.reservations_from_today[i].id == identity) {
                    var reservation = Reservation.get({id: identity}, function () {
                        reservation.$remove(function () {
                            //$scope.reservations_from_today[i].$delete(function(){
                            console.log('Deleting reservation with id ', identity);
                            $scope.reservations_from_today = Reservation.query();
                        });
                    });
                    break;
                }
            }
            */
            $http({
                method: 'DELETE',
                url: 'http://localhost:8080/Spring4MVCAngularJSNgResourceExample/reservation/'+identity
            }).then(function successCallback(response) {
                console.log('Deleting reservation with id ', identity);
                $scope.reservations_from_today = Reservation.query();
            }, function errorCallback(response) {
                alert("You DIDN'T deleted this reservation");
            });
        };
    }

        //alert("Data loaded");
]);

schedulerApp.controller('WeekController', ['$scope', 'Reservation', '$rootScope', '$routeParams', '$location', '$http',

    function ($scope, Reservation, $rootScope, $routeParams, $location, $http) {
        /*
	    $http.get('http://localhost:8080/Esercitazione7/week/'). //+$routeProvider if I would ike to restrict, but I restrict just in the client
	    success(function(data) {
	    	$scope.reservations = data;
	    */
		var self = this;
	    self.reservation= new Reservation();
	    self.reservations=[];
	         
        self.reservations = Reservation.query();
        self.reservations.$promise.then(function () {
            $scope.reservations = self.reservations;
            fill_cells($scope, $routeParams, $rootScope, $location);
            search_bookings($scope);
        });

        //functions possibly called
        $scope.next_week = function() {
            next_week($scope, $location, $rootScope);
        }
        $scope.previous_week = function() {
            previous_week($scope, $location, $rootScope);
        }
        $scope.submit_function = function() {
            var id = document.getElementById('clicked_id').name;
            document.getElementById(id).className = "clicked";
            addReservation(id, $scope.user.description, $scope, $http, self, Reservation); //or this.text
            document.getElementById('description').type='text';
            document.getElementById('submit').type='submit';
        }
        $scope.handle_function = function(o) {
            document.getElementById('clicked_id').name = o;
            show_booking(o);
            handleReservations(o);
        }

        handleReservations = function (o) {
            var already_present = false;
            /*
             for(i=0; i<reservations.length; i++){
             console.log("TRYING TO COMPARE " + o + " " + reservations[i].cell_id);
             if(o.localeCompare(reservations[i].cell_id)==0)
             var element = document.getElementById(o);
             var wrappedResult = angular.element(element);
             if(angular.element(myElement).hasClass('my-class').localeCompare("clicked")==0){
             already_present = true;
             break;
             }
             }
             */
            var html_element = document.getElementById(o);
            var angular_element = angular.element(html_element);
            if(angular.element(angular_element).hasClass('booked'))
                already_present = true;

            //check if day is before today
            //su_0000
            hour = o.substring(3,5);
            //minutes = clicked_id.substring(5,7);
            //console.log("Hour and minutes " + hour + " " + minutes);
            day = o.substring(0,2);
            console.log("Day " + day);
            var date_booking = {};
            switch(day) {
                case "su" :
                {
                    day = "Sun";
                    console.log("case sun");
                    date_booking = today.weekday(0).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
                case "mo" :
                {
                    day = "Mon";
                    console.log("case mon");
                    date_booking = today.weekday(1).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
                case "tu" :
                {
                    day = "Tue";
                    console.log("case tue");
                    date_booking = today.weekday(2).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
                case "we" :
                {
                    day = "Wed";
                    console.log("case wed");
                    date_booking = today.weekday(3).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
                case "th" :
                {
                    day = "Thu";
                    console.log("case thu");
                    date_booking = today.weekday(4).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
                case "fr" :
                {
                    day = "Fri";
                    console.log("case fri");
                    date_booking = today.weekday(5).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
                case "sa" :
                {
                    day = "Sat";
                    console.log("case sat");
                    date_booking = today.weekday(6).format("ddd D/MM YYYY" + " " + hour);
                    break;
                }
            }
            console.log("Date booking: "+date_booking);
            var x = moment(date_booking, "ddd D/MM YYYY HH");
            var y = moment();

            if (x.valueOf() > y.valueOf() && !already_present){
                //document.getElementById('description').type='text';
                document.getElementById('submit').type = 'submit';
            }
            else {
                alert("This block can not be booked because already booked or before now");
                document.getElementById('submit').type='hidden';
            }

        }
    }]
);


//other functions
function add_to_bookings(clicked_id, description, self){
    console.log("The button is " + clicked_id);
    //su_0000
    hour = clicked_id.substring(3,5);
    //minutes = clicked_id.substring(5,7);
    //console.log("Hour and minutes " + hour + " " + minutes);
    day = clicked_id.substring(0,2);
    console.log("Day " + day);
    var date_booking = {};
    switch(day) {
        case "su" :
        {
            day = "Sun";
            console.log("case sun");
            date_booking = today.weekday(0).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "mo" :
        {
            day = "Mon";
            console.log("case mon");
            date_booking = today.weekday(1).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "tu" :
        {
            day = "Tue";
            console.log("case tue");
            date_booking = today.weekday(2).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "we" :
        {
            day = "Wed";
            console.log("case wed");
            date_booking = today.weekday(3).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "th" :
        {
            day = "Thu";
            console.log("case thu");
            date_booking = today.weekday(4).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "fr" :
        {
            day = "Fri";
            console.log("case fri");
            date_booking = today.weekday(5).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "sa" :
        {
            day = "Sat";
            console.log("case sat");
            date_booking = today.weekday(6).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
    }
    console.log("Date booking: "+date_booking);
    var formatted_date_booking = moment(date_booking, 'ddd D/MM YYYY').format('YYYY-MM-DD');
    var date_booking_map = {
        'reservation_date' : formatted_date_booking + " " + hour + ":00" ,
        'description' : description
    }
    return date_booking_map;
}


function show_booking(clicked_id){
    hour = clicked_id.substring(3,5);
    //minutes = clicked_id.substring(5,7);
    //console.log("Hour and minutes " + hour + " " + minutes);
    day = clicked_id.substring(0,2);
    console.log("Day " + day);
    var date_booking = {};
    switch(day) {
        case "su" :
        {
            day = "Sun";
            console.log("case sun");
            date_booking = today.weekday(0).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "mo" :
        {
            day = "Mon";
            console.log("case mon");
            date_booking = today.weekday(1).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "tu" :
        {
            day = "Tue";
            console.log("case tue");
            date_booking = today.weekday(2).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "we" :
        {
            day = "Wed";
            console.log("case wed");
            date_booking = today.weekday(3).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "th" :
        {
            day = "Thu";
            console.log("case thu");
            date_booking = today.weekday(4).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "fr" :
        {
            day = "Fri";
            console.log("case fri");
            date_booking = today.weekday(5).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "sa" :
        {
            day = "Sat";
            console.log("case sat");
            date_booking = today.weekday(6).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
    }
    document.getElementById('clicked_id').value = date_booking+":00";
}



function remove_from_bookings(clicked_id, $scope, $http){
    console.log("The button is " + clicked_id);
    //su_0000
    hour = clicked_id.substring(clicked_id.length-2,clicked_id.length);
    //minutes = clicked_id.substring(5,7);
    //console.log("Hour and minutes " + hour + " " + minutes);
    day = clicked_id.substring(0,2);
    console.log("Day " + day);
    var date_booking;
    switch(day.toLowerCase()) {
        case "su" :
        {
            day = "Sun";
            console.log("case sun");
            date_booking = today.weekday(0).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "mo" :
        {
            day = "Mon";
            console.log("case mon");
            date_booking = today.weekday(1).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "tu" :
        {
            day = "Tue";
            console.log("case tue");
            date_booking = today.weekday(2).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "we" :
        {
            day = "Wed";
            console.log("case wed");
            date_booking = today.weekday(3).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "th" :
        {
            day = "Thu";
            console.log("case thu");
            date_booking = today.weekday(4).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "fr" :
        {
            day = "Fri";
            console.log("case fri");
            date_booking = today.weekday(5).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
        case "sa" :
        {
            day = "Sat";
            console.log("case sat");
            date_booking = today.weekday(6).format("ddd D/MM YYYY" + " " + hour);
            break;
        }
    }

    //find in the array and delete
    $scope.reservations_from_today = $.grep($scope.reservations_from_today,
        function(o,i) { return o.reservation_date === date_booking; },
        true);

    /*
    $http.get('http://localhost:8080/Esercitazione7/agenda/').
    success(function(data) {
        $scope.reservations_temp = data;
    */
	var self = this;
    self.reservation= new Reservation();
    self.reservations=[];
         
    //self.fetchAllReservations = function(){
        self.reservations = Reservation.query();
        self.reservations.$promise.then(function () {
            $scope.reservations_temp = self.reservations;
            for (i in reservations_temp) {
                var date_temp = reservations_temp[i].reservation_date;
                var date_temp2 = date_booking.toString();
                if (date_temp != null && date_temp2 != null && date_temp.localeCompare(date_temp2) == 0) {
                    //DELETE REST
                    var id_to_delete = reservations_temp[i].id;
                    // Simple GET request example:
                    /*
                     $http({
                     method: 'DELETE',
                     url: 'http://localhost:8080/Esercitazione7/agenda/'+id
                     }).then(function successCallback(response) {
                     if(data == 1)
                     alert("You deleted this reservation");
                     if(data == -1)
                     alert("You DIDN'T deleted this reservation");
                     }, function errorCallback(response) {
                     alert("You DIDN'T deleted this reservation");
                     });
                     */
                    //self.deleteReservation = function(identity){
                    var reservation = Reservation.get({id: identity}, function () {
                        reservation.$delete(function () {
                            console.log('Deleting reservation with id ', identity);
                            $scope.reservations = Reservation.query();
                        });
                    });
                    //};
                    break;
                }
            }
        });
        //return reservations_temp[i].id;
    //};
    /*
    })
    .error(function(){
    	console.log("There was an error while communicating with the server");
    });;
    */
}


function previous_week($scope, $location, $rootScope){
    console.log("event previous_week fired");
    today.add(-1, 'weeks');
    document.getElementById('week_and_year').innerHTML = today.format('MMMM YYYY');

    $scope.days = [
        "#" ,
        today.weekday(0).format('ddd D/MM') ,
        today.weekday(1).format('ddd D/MM') ,
        today.weekday(2).format('ddd D/MM') ,
        today.weekday(3).format('ddd D/MM') ,
        today.weekday(4).format('ddd D/MM') ,
        today.weekday(5).format('ddd D/MM') ,
        today.weekday(6).format('ddd D/MM')
    ];

    $rootScope.month = today.weekday(0).month()+1;
    $rootScope.day   = today.weekday(0).date();
    $rootScope.year  = today.weekday(0).year();

    // /week/:year/:month/:day
    $location.path('/week/'+$rootScope.year+"/"+$rootScope.month+"/"+$rootScope.day);


    clear_bookings($scope);
    search_bookings($scope);
    //$scope.$apply();
}

function next_week($scope, $location, $rootScope){
    console.log("event next_week fired");
    today.add(1, 'weeks');

    document.getElementById('week_and_year').innerHTML = today.format('MMMM YYYY');

    $scope.days = [
        "#" ,
        today.weekday(0).format('ddd D/MM') ,
        today.weekday(1).format('ddd D/MM') ,
        today.weekday(2).format('ddd D/MM') ,
        today.weekday(3).format('ddd D/MM') ,
        today.weekday(4).format('ddd D/MM') ,
        today.weekday(5).format('ddd D/MM') ,
        today.weekday(6).format('ddd D/MM')
    ];

    $rootScope.month = today.weekday(0).month()+1;
    $rootScope.day   = today.weekday(0).date();
    $rootScope.year  = today.weekday(0).year();

    // /week/:year/:month/:day
    $location.path('/week/'+$rootScope.year+"/"+$rootScope.month+"/"+$rootScope.day);

    clear_bookings($scope);
    search_bookings($scope);
    //$scope.$apply();
}

function clear_bookings($scope) {
    //console.log("event clear fired");

    /*
    list = $("#table td");
    for (index = 0; index < list.length; ++index) {
        console.log("cycle entered");
        element = list[index];
        id = element.id;
        if(id != null || id.localeCompare("")!=0)
            document.getElementById(id).className = "not_clicked";
    }
    */

    for(var offset =0; offset<7; offset++) {
        $scope.cells_zero[offset].booked = false;
        $scope.cells_one[offset].booked = false;
        $scope.cells_two[offset].booked = false;
        $scope.cells_three[offset].booked = false;
        $scope.cells_four[offset].booked = false;
        $scope.cells_five[offset].booked = false;
        $scope.cells_six[offset].booked = false;
        $scope.cells_seven[offset].booked = false;
        $scope.cells_eight[offset].booked = false;
        $scope.cells_nine[offset].booked = false;
        $scope.cells_ten[offset].booked = false;
        $scope.cells_eleven[offset].booked = false;
        $scope.cells_twelve[offset].booked = false;
        $scope.cells_thirteen[offset].booked = false;
        $scope.cells_fourteen[offset].booked = false;
        $scope.cells_fifteen[offset].booked = false;
        $scope.cells_sixteen[offset].booked = false;
        $scope.cells_seventeen[offset].booked = false;
        $scope.cells_eighteen[offset].booked = false;
        $scope.cells_nineteen[offset].booked = false;
        $scope.cells_twenty[offset].booked = false;
        $scope.cells_twentyone[offset].booked = false;
        $scope.cells_twentytwo[offset].booked = false;
        $scope.cells_twentythree[offset].booked = false;
    }

    //console.log("event clear ended");
}

function search_bookings($scope){
    for (index = 0; index < $scope.reservations.length; ++index) {
        //moment(date, 'format') returns a moment; moment(date, 'format').format('format') returns its string
        booking_time = moment(moment($scope.reservations[index].reservation_date, 'YYYY-MM-DD HH').format('ddd D/MM YYYY HH'), 'ddd D/MM YYYY HH');
        if(today.weekday(0).year() == booking_time.year()) { //same year
            a = today.weekday(0).week();
            b = booking_time.week();
            if(a == b){
                console.log("filling");
                var booking_time_string = booking_time.format('ddd D/MM YYYY HH');
                day2 = booking_time_string.substring(0, 2).toLowerCase();
                hour2 = booking_time_string.substring(booking_time_string.length-2, booking_time_string.length);
                var offset;
                switch(day2){
                    case "su" :
                    {
                        offset=0;
                        break;
                    }
                    case "mo" :
                    {
                        offset=1;
                        break;
                    }
                    case "tu" :
                    {
                        offset=2;
                        break;
                    }
                    case "we" :
                    {
                        offset=3;
                        break;
                    }
                    case "th" :
                    {
                        offset=4;
                        break;
                    }
                    case "fr" :
                    {
                        offset=5;
                        break;
                    }
                    case "sa" :
                    {
                        offset=6;
                        break;
                    }
                }
                switch(hour2){
                    case "00" :
                        $scope.cells_zero[offset].booked = true;
                        break;
                    case "01" :
                        $scope.cells_one[offset].booked = true;
                        break;
                    case "02" :
                        $scope.cells_two[offset].booked = true;
                        break;
                    case "03" :
                        $scope.cells_three[offset].booked = true;
                        break;
                    case "04" :
                        $scope.cells_four[offset].booked = true;
                        break;
                    case "05" :
                        $scope.cells_five[offset].booked = true;
                        break;
                    case "06" :
                        $scope.cells_six[offset].booked = true;
                        break;
                    case "07" :
                        $scope.cells_seven[offset].booked = true;
                        break;
                    case "08" :
                        $scope.cells_eight[offset].booked = true;
                        break;
                    case "09" :
                        $scope.cells_nine[offset].booked = true;
                        break;
                    case "10" :
                        $scope.cells_ten[offset].booked = true;
                        break;
                    case "11" :
                        $scope.cells_eleven[offset].booked = true;
                        break;
                    case "12" :
                        $scope.cells_twelve[offset].booked = true;
                        break;
                    case "13" :
                        $scope.cells_thirteen[offset].booked = true;
                        break;
                    case "14" :
                        $scope.cells_fourteen[offset].booked = true;
                        break;
                    case "15" :
                        $scope.cells_fifteen[offset].booked = true;
                        break;
                    case "16" :
                        $scope.cells_sixteen[offset].booked = true;
                        break;
                    case "17" :
                        $scope.cells_seventeen[offset].booked = true;
                        break;
                    case "18" :
                        $scope.cells_eighteen[offset].booked = true;
                        break;
                    case "19" :
                        $scope.cells_nineteen[offset].booked = true;
                        break;
                    case "20" :
                        $scope.cells_twenty[offset].booked = true;
                        break;
                    case "21" :
                        $scope.cells_twentyone[offset].booked = true;
                        break;
                    case "22" :
                        $scope.cells_twentytwo[offset].booked = true;
                        break;
                    case "23" :
                        $scope.cells_twentythree[offset].booked = true;
                        break;
                }
            }
        }
    }
}

function fill_cells($scope, $routeParams, $rootScope, $location) {
    //load bookings
    $scope.cells_zero = [];
    $scope.cells_one = [];
    $scope.cells_two = [];
    $scope.cells_three = [];
    $scope.cells_four = [];
    $scope.cells_five = [];
    $scope.cells_six = [];
    $scope.cells_seven = [];
    $scope.cells_eight = [];
    $scope.cells_nine = [];
    $scope.cells_ten = [];
    $scope.cells_eleven = [];
    $scope.cells_twelve = [];
    $scope.cells_thirteen = [];
    $scope.cells_zero = [];
    $scope.cells_fourteen = [];
    $scope.cells_fifteen = [];
    $scope.cells_sixteen = [];
    $scope.cells_seventeen = [];
    $scope.cells_eighteen = [];
    $scope.cells_nineteen = [];
    $scope.cells_twenty = [];
    $scope.cells_twentyone = [];
    $scope.cells_twentytwo = [];
    $scope.cells_twentythree = [];
    var day_string;
    var array_days = [];
    if ($rootScope != null) {
        var year_requested = $rootScope.year;
        var month_requested = $rootScope.month;
        var day_requested = $rootScope.day;
        $location.path('/week/'+year_requested+"/"+month_requested+"/"+day_requested);
    }
    else
        if ($routeParams != null) {
            var year_requested = $routeParams.year;
            var month_requested = $routeParams.month;
            var day_requested = $routeParams.day;
        }
    if (year_requested != null && year_requested != 0 && month_requested != null && month_requested != 0 && day_requested != null && day_requested != 0) {
        today = moment(year_requested + "-" + month_requested + "-" + day_requested);
    }
    else {
        today = moment();
    }
    //data
    document.getElementById('week_and_year').innerHTML = today.format('MMMM YYYY');
    $scope.days = [
        "#",
        today.weekday(0).format('ddd D/MM'),
        today.weekday(1).format('ddd D/MM'),
        today.weekday(2).format('ddd D/MM'),
        today.weekday(3).format('ddd D/MM'),
        today.weekday(4).format('ddd D/MM'),
        today.weekday(5).format('ddd D/MM'),
        today.weekday(6).format('ddd D/MM')
    ];

    var array_days = ["su_", "mo_", "tu_", "we_", "th_", "fr_", "sa_"];
    for (j = 0; j < 7; j++) { //all hours
        day_string = array_days[j];
        $scope.cells_zero.push({
            cell: day_string + '00:00'
        });
        $scope.cells_one.push({
            cell: day_string + '01:00'
        });
        $scope.cells_two.push({
            cell: day_string + '02:00'
        });
        $scope.cells_three.push({
            cell: day_string + '03:00'
        });
        $scope.cells_four.push({
            cell: day_string + '04:00'
        });
        $scope.cells_five.push({
            cell: day_string + '05:00'
        });
        $scope.cells_six.push({
            cell: day_string + '06:00'
        });
        $scope.cells_seven.push({
            cell: day_string + '07:00'
        });
        $scope.cells_eight.push({
            cell: day_string + '08:00'
        });
        $scope.cells_nine.push({
            cell: day_string + '09:00'
        });
        $scope.cells_ten.push({
            cell: day_string + '10:00'
        });
        $scope.cells_eleven.push({
            cell: day_string + '11:00'
        });
        $scope.cells_twelve.push({
            cell: day_string + '12:00'
        });
        $scope.cells_thirteen.push({
            cell: day_string + '13:00'
        });
        $scope.cells_fourteen.push({
            cell: day_string + '14:00'
        });
        $scope.cells_fifteen.push({
            cell: day_string + '15:00'
        });
        $scope.cells_sixteen.push({
            cell: day_string + '16:00'
        });
        $scope.cells_seventeen.push({
            cell: day_string + '17:00'
        });
        $scope.cells_eighteen.push({
            cell: day_string + '18:00'
        });
        $scope.cells_nineteen.push({
            cell: day_string + '19:00'
        });
        $scope.cells_twenty.push({
            cell: day_string + '20:00'
        });
        $scope.cells_twentyone.push({
            cell: day_string + '21:00'
        });
        $scope.cells_twentytwo.push({
            cell: day_string + '22:00'
        });
        $scope.cells_twentythree.push({
            cell: day_string + '23:00'
        });
    }

}

function addReservation (o, des, $scope, $http, self, Reservation) {
    var new_element = add_to_bookings(o, des);
    //POST REST
    /*
    $http.post('http://localhost:8080/Esercitazione7/new_reservation').
    success(function(data) {
    	if(data == 1){
    	    alert("You reserved this timeslot");
    	    $scope.reservations.push(new_element);
    	    search_bookings($scope);
    	}
    	if(data == -1)
    	    alert("You DIDN'T reserved this timeslot");
    })
    .error(function(){
    	console.log("There was an error while communicating with the server");
    });
    */
    //self.createReservation = function(){
        self.reservation.description = new_element.description;
        self.reservation.reservation_date = new_element.reservation_date;
        self.reservation.$save(function(){
            self.reservations = Reservation.query();
            self.reservations.$promise.then(function () {
                $scope.reservations = self.reservations;
                //fill_cells($scope, $routeParams, $rootScope, $location);
                search_bookings($scope);
            });
        });
    //};
    //return o;
};

function delReservation (o, $scope, $http) {
    var element_key_to_remove = remove_from_bookings(o, $scope, $http);
};