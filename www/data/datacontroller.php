<?php
require('appconfig.php');
require('model_home.php');

class DataController {
	private $model;

	public function createError($msg) {
		return '{ "error": "'.$msg.'" }';
	}

	function retrieve($location, $dataType) {
		switch ($location) {

			case 'home':
				$model = new HomeModel();
				if (method_exists($model, 'get'.$dataType))
					return $model->{'get'.$dataType}();
				else
					return $this->createError("Invalid dataType provided in 'retrieve'.");
				break;

			default:
				return $this->createError("Invalid location provided in 'retrieve'.");
		}
	}
}

?>