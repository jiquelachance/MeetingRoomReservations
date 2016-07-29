<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page session="false"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
<title>User Registration</title>
</head>
<body>

	<nav class="navbar navbar-default">
	    <div class="container-fluid">
	        <div class="navbar-header">
	            <ul class="nav navbar-nav">
	                <li><a href="registration">Registration</a></li>
	                <li><a href="login">Login</a></li>
	            </ul>
	        </div>
	        </div>
	    </div>
	</nav>
		
    <H1>
        User Registration
    </H1>
    <form:form modelAttribute="user" method="POST" enctype="utf8">
        <br>
    <tr>
        <td><label>Username:</label></td>
        <td><form:input path="username" value="" /></td>
        <form:errors path="username" element="div" />
    </tr>
       <br>
    <tr>
        <td><label>Password:</label></td>
        <td><form:input path="password" value="" type="password" /></td>
        <form:errors path="password" element="div" />
    </tr>
        <br>
    <tr>
        <td><label>Type ('USER', 'DBA', 'ADMIN'):</label></td>
        <td><form:input path="type" value="" type="type" /></td>
        <form:errors path="type" element="div" />
    </tr>
        <br>
        <button type="submit">Register</button>
    </form:form>
</body>
</html>