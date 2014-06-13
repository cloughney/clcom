<?php

class RecentItem implements JsonSerializable {
	private $values;

	public function __construct($id = -1, $name = "Failed to load!", $img = "./img/placeholder_recentitem.gif", $type = "notset") {
		$this->values["id"] = $id;
		$this->values["name"] = $name;
		$this->values["image"] = $img;
		$this->values["type"] = $type;
	}

	public function jsonSerialize() {
		return $this->values;
	}
}



class HomeModel {
	
	private $values;

	//constructor
	public function __construct() {

	}




	//get recent items
	public function getRecent() {
		$recentItems = [];

		try {
			$mysqli = new mysqli(AppConfig::$mysql_host, AppConfig::$mysql_user, AppConfig::$mysql_pass, AppConfig::$mysql_db);
			if (mysqli_connect_errno($mysqli)) {
				$this->values["error"] = "Could not connect to MySQL database";
				return;
			}


			//projectss
			$sql = "SELECT `id`, `Name`, `ImageThumb` FROM Projects LIMIT 3";
			$r = $mysqli->query($sql);
			if (!r) {
				mysqli_close($mysqli);
				$this->values["error"] = "Error in SQL statement";
				return;
			}
			while($row = $r->fetch_assoc()) {
				array_push($recentItems, new RecentItem($row["id"], $row["Name"], $row["ImageThumb"], "project"));
			}

			/*
			//portfolio
			$sql = "SELECT `id`, `Name`, `ImageThumb` FROM Projects LIMIT 3";
			$r = query($sql);
			if (!r) {
				mysqli_close($mysqli);
				$this->values["error"] = "Error in SQL statement";
				return;
			}
			$items = [];
			while($row = $r->fetch_assoc()) {
				array_push($items, new RecentItem($row["ImageThumb"], $row["Name"], 'Projects/'.$row["id"]));
			}

			//experience
			$sql = "SELECT `id`, `Name`, `ImageThumb` FROM Projects LIMIT 3";
			$r = query($sql);
			if (!r) {
				mysqli_close($mysqli);
				$this->values["error"] = "Error in SQL statement";
				return;
			}
			$items = [];
			while($row = $r->fetch_assoc()) {
				array_push($items, new RecentItem($row["ImageThumb"], $row["Name"], 'Projects/'.$row["id"]));
			}
			*/

			mysqli_close($mysqli);
		} catch (Exception $ex)  {
			$this->values["error"] = "Issue occurred while communicating with MySQL database ($ex)";
		}

		return json_encode($recentItems);
	}

}


?>