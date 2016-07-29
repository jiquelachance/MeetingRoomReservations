<!-- we do not need header, body, ... -->
<div>
    <div class="div_1">
        <button type="button" class="btn btn-default" aria-label="Left Align"  ng-click="previous_week()" id="back_button">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        </button>
        <button type="button" class="btn btn-default" aria-label="Right Align" ng-click="next_week()" id="up_button">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </button>
    </div>
    <div class="div_2">
        &nbsp;&nbsp;<h6 id="week_and_year"> </h6>
    </div>
</div>
<br>
<br>

<form ng-submit="submit_function()">
    Pick a timeslot, enter a description and then book! &nbsp;&nbsp;&nbsp;&nbsp; <!-- some space -->
    <input type="text" ng-model="user.clicked_id" id="clicked_id" name="clicked_id" placeholder="Day and timeslot"/>
    <input type="text" ng-model="user.description" id="description" name="description" placeholder="Enter a description" required/>
    <input type="hidden" id="submit" value="Book"/>
</form>

<hr>


<div id="container" class="container" >
    <table id="table" name="table" class="table table-bordered">
        <tr>
            <th data-ng-repeat="day in days"> {{ day }} </th>
        </tr>

        <tr>
            <td>00:00</td>
            <td data-ng-repeat="cell_zero in cells_zero" data-ng-attr-id="{{ cell_zero.cell }}"  ng-click="handle_function(cell_zero.cell)" ng-class="{ booked: cell_zero.booked }">  </td>
        </tr>

        <tr>
            <td>01:00</td>
            <td data-ng-repeat="cell_one in cells_one" data-ng-attr-id="{{ cell_one.cell }}" ng-click="handle_function(cell_one.cell)" ng-class="{ booked: cell_one.booked }">  </td>
        </tr>

        <tr>
            <td>02:00</td>
            <td data-ng-repeat="cell_two in cells_two" data-ng-attr-id="{{ cell_two.cell }}" ng-click="handle_function(cell_two.cell)" ng-class="{ booked: cell_two.booked }"> </td>
        </tr>

        <tr>
            <td>03:00</td>
            <td data-ng-repeat="cell_three in cells_three" data-ng-attr-id="{{ cell_three.cell }}" ng-click="handle_function(cell_three.cell)" ng-class="{ booked: cell_three.booked }"> </td>
        </tr>

        <tr>
            <td>04:00</td>
            <td data-ng-repeat="cell_four in cells_four" data-ng-attr-id="{{ cell_four.cell }}" ng-click="handle_function(cell_four.cell)" ng-class="{ booked: cell_four.booked }">  </td>
        </tr>

        <tr>
            <td>05:00</td>
            <td data-ng-repeat="cell_five in cells_five" data-ng-attr-id="{{ cell_five.cell }}" ng-click="handle_function(cell_five.cell)" ng-class="{ booked: cell_five.booked }"> </td>
        </tr>

        <tr>
            <td>06:00</td>
            <td data-ng-repeat="cell_six in cells_six" data-ng-attr-id="{{ cell_six.cell }}" ng-click="handle_function(cell_six.cell)" ng-class="{ booked: cell_six.booked }">  </td>
        </tr>

        <tr>
            <td>07:00</td>
            <td data-ng-repeat="cell_seven in cells_seven" data-ng-attr-id="{{ cell_seven.cell }}" ng-click="handle_function(cell_seven.cell)" ng-class="{ booked: cell_seven.booked }">  </td>
        </tr>

        <tr>
            <td>08:00</td>
            <td data-ng-repeat="cell_eight in cells_eight" data-ng-attr-id="{{ cell_eight.cell }}" ng-click="handle_function(cell_eight.cell)" ng-class="{ booked: cell_eight.booked }"> </td>
        </tr>

        <tr>
            <td>09:00</td>
            <td data-ng-repeat="cell_nine in cells_nine" data-ng-attr-id="{{ cell_nine.cell }}" ng-click="handle_function(cell_nine.cell)" ng-class="{ booked: cell_nine.booked }"> </td>
        </tr>

        <tr>
            <td>10:00</td>
            <td data-ng-repeat="cell_ten in cells_ten" data-ng-attr-id="{{ cell_ten.cell }}" ng-click="handle_function(cell_ten.cell)" ng-class="{ booked: cell_ten.booked }"> </td>
        </tr>

        <tr>
            <td>12:00</td>
            <td data-ng-repeat="cell_eleven in cells_eleven" data-ng-attr-id="{{ cell_eleven.cell }}" ng-click="handle_function(cell_eleven.cell)" ng-class="{ booked: cell_eleven.booked }">  </td>
        </tr>

        <tr>
            <td>12:00</td>
            <td data-ng-repeat="cell_twelve in cells_twelve" data-ng-attr-id="{{ cell_twelve.cell }}" ng-click="handle_function(cell_twelve.cell)" ng-class="{ booked: cell_twelve.booked }">  </td>
        </tr>

        <tr>
            <td>13:00</td>
            <td data-ng-repeat="cell_thirteen in cells_thirteen" data-ng-attr-id="{{ cell_thirteen.cell }}" ng-click="handle_function(cell_thirteen.cell)" ng-class="{ booked: cell_thirteen.booked }">  </td>
        </tr>

        <tr>
            <td>14:00</td>
            <td data-ng-repeat="cell_fourteen in cells_fourteen" data-ng-attr-id="{{ cell_fourteen.cell }}" ng-click="handle_function(cell_fourteen.cell)" ng-class="{ booked: cell_fourteen.booked }">  </td>
        </tr>

        <tr>
            <td>15:00</td>
            <td data-ng-repeat="cell_fifteen in cells_fifteen" data-ng-attr-id="{{ cell_fifteen.cell }}" ng-click="handle_function(cell_fifteen.cell)" ng-class="{ booked: cell_fifteen.booked }">  </td>
        </tr>

        <tr>
            <td>16:00</td>
            <td data-ng-repeat="cell_sixteen in cells_sixteen" data-ng-attr-id="{{ cell_sixteen.cell }}" ng-click="handle_function(cell_sixteen.cell)" ng-class="{ booked: cell_sixteen.booked }">  </td>
        </tr>

        <tr>
            <td>17:00</td>
            <td data-ng-repeat="cell_seventeen in cells_seventeen" data-ng-attr-id="{{ cell_seventeen.cell }}" ng-click="handle_function(cell_seventeen.cell)" ng-class="{ booked: cell_seventeen.booked }">  </td>
        </tr>

        <tr>
            <td>18:00</td>
            <td data-ng-repeat="cell_eighteen in cells_eighteen" data-ng-attr-id="{{ cell_eighteen.cell }}" ng-click="handle_function( cell_eighteen.cell)" ng-class="{ booked: cell_eighteen.booked }">  </td>
        </tr>

        <tr>
            <td>19:00</td>
            <td data-ng-repeat="cell_nineteen in cells_nineteen" data-ng-attr-id="{{ cell_nineteen.cell }}" ng-click="handle_function( cell_nineteen.cell)" ng-class="{ booked: cell_nineteen.booked }"> </td>
        </tr>

        <tr>
            <td>20:00</td>
            <td data-ng-repeat="cell_twenty in cells_twenty" data-ng-attr-id="{{ cell_twenty.cell }}" ng-click="handle_function(cell_twenty.cell)" ng-class="{ booked: cell_twenty.booked }">  </td>
        </tr>

        <tr>
            <td>21:00</td>
            <td data-ng-repeat="cell_twentyone in cells_twentyone" data-ng-attr-id="{{ cell_twentyone.cell }}" ng-click="handle_function(cell_twentyone.cell)" ng-class="{ booked: cell_twentyone.booked }"> </td>
        </tr>

        <tr>
            <td>22:00</td>
            <td data-ng-repeat="cell_twentytwo in cells_twentytwo" data-ng-attr-id="{{ cell_twentytwo.cell }}" ng-click="handle_function(cell_twentytwo.cell)" ng-class="{ booked: cell_twentytwo.booked }">  </td>
        </tr>

        <tr>
            <td>23:00</td>
            <td data-ng-repeat="cell_twentythree in cells_twentythree" data-ng-attr-id="{{ cell_twentythree.cell }}" ng-click="handle_function(cell_twentythree.cell)" ng-class="{ booked: cell_twentythree.booked }">  </td>
        </tr>

    </table>
</div>
