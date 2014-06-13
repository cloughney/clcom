<?php
require('datacontroller.php');

$controller = new DataController();

function returnToHome() {
	echo 'You may be lost... <a href="../">Click here</a> to get back to where you should be.';
}

if (isset($_GET['action']) && !empty($_GET['action'])) {
	switch ($_GET['action']) {

		//request data from the server
		case 'retrieve':
			if (isset($_GET['location']) && !empty($_GET['location']) && isset($_GET['datatype']) && !empty($_GET['datatype'])) {				
				echo $controller->{$_GET['action']}($_GET['location'], $_GET['datatype']);
			} else echo 'fail'; //returnToHome();
			break;

		//update data on the server
		case 'update':

			break;

		default:
			returnToHome();
	}
} else returnToHome();


?>