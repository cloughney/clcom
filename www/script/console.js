window.ConsoleExe = {
	isRunning: false,
	promptText: 'chris@chrisloughney.com:~$'
}

var AboutExecutable = {
	arrLines: [
		'.','/','a','b','o','u','t',' ','-','v<br /><br />',
		'Loading basic profile information for user chris...',
		'Done<br /><br />',
		'*** Profile ***<br />',
		'Name: Chris Loughney<br />',
		'Location: Los Angeles, CA<br />',
		'Profession: Software Engineer<br /><br />',
		'Loading skill information for user chris...',
		'Done<br /><br />',
		'*** Skills ***<br />',
		'Languages: C#, Java, C++<br />',
		'Scripting: PHP, Ruby, JavaScript<br />',
		'Database: MySQL, MSSQL, Ensemble Cache<br />',
		'Web: HTML5, CSS3, Responsive Design, RESTful APIs<br />',
	],
	arrDelays: [
		120,120,120,120,120,120,120,120,120,100,
		1000,
		500,
		100,
		50,
		50,
		500,
		1000,
		500,
		100,
		50,
		50,
		50,
		500
	]
};


function runExecutable(exe, cmdIndex) {
	if (cmdIndex === void 0) {
		if (ConsoleExe.isRunning) return;
		ConsoleExe.isRunning = true;
		cmdIndex = 0;
		$('#divConsole').html(ConsoleExe.promptText);
		runExecutable(exe, 0);
		return;
	}
	if (exe.arrLines.length > cmdIndex) {
		$('#divConsole').append(exe.arrLines[cmdIndex]);
	} else {
		$('#divConsole').append('<br />' + ConsoleExe.promptText);
		ConsoleExe.isRunning = false;
		return;
	}
	var cmdDelay = exe.arrDelays[cmdIndex];
	cmdIndex += 1;
	setTimeout(function() { 
		runExecutable(exe, cmdIndex); 
	}, cmdDelay);
}