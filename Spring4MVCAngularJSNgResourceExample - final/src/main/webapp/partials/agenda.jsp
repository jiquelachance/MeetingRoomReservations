<!-- we do not need header, body, ... -->

<h1 id="bookings_starting_from">NEXT BOOKINGS</h1>

<div data-ng-repeat="booking in reservations_from_today track by $index"> <!-- it is necessary to put track by $index to avoid problems of duplicated keys in ng-repeat -->
    <h3>Date and time slot: {{ booking.reservation_date.substring(0,13) }}:00</h3>
    <br>
    <p>Description: {{ booking.description }}</p>&nbsp;&nbsp;
    <input type="button" value="Delete" ng-click="delete_reservation( booking.id )" id="delete_button">
    <br>
    <hr>
    <br>
</div>
