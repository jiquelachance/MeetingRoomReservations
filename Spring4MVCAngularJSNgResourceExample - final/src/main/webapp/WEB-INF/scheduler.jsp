<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
    <style>
        .table th {
            text-align: center;
        }
        .booked {
            background-color: yellow;
        }
    </style>

    <script src="libs/lodash.js"></script>
    <script src="libs/jquery.js"></script>
    <script src="libs/jquery-ui.js"></script>
    <script src="libs/bootstrap.js"></script>
    <script src="libs/moment.js"></script>
    <script src="libs/moment-range.js"></script>
    <script src="libs/angular.js"></script>
    <script src="libs/angular-route.js"></script>
    <script type="text/javascript" src="libs/angular-resource.js"></script>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/jquery-ui.css">

</head>

<body ng-app="schedulerApp">

<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <ul class="nav navbar-nav">
                <li><a href="#/week">Week table</a></li>
                <li><a href="#/agenda">Agenda</a></li>
                <li><a href="#/users">Users</a></li>
                <li><a href="logout">Logout</a></li>
            </ul>
        </div>
        </div>
    </div>
</nav>

<div class="container">
    <div ng-view></div>
</div>

      <script src="js/scheduler_app.js"></script>
      <script src="js/service/scheduler_service.js"></script>
      <script src="js/controller/scheduler_controller.js"></script>
      
</body>
</html>
