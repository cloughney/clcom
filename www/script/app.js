function initNavigation() {
	var shade = $('#divMainShade');
	var hideShade = function () {
		//shade.off('mouseenter');
		shade.slideUp(300);
	};
	var showShade = function(color, text) {
		shade.css('background', color);
		shade.children('div:first').html(text);
		if (!shade.is(':visible')) {
			shade.slideDown(300);
		}
	}
	shade.slideUp(0);
	//shade.mouseenter(hideShade);
	$('#container_sb_menu').mouseleave(hideShade);

	var menuItems = $('.menuitem');
	var menuItems_mouseenter = function () {
		var color, text;
		switch (this.id) {
			case 'menuDashboard':
				color = 'lightblue';
				text = "Dashboard";
				break;
			case 'menuProjects':
				color = '#FFC14F';
				text = "Projects";
				break;
			case 'menuResume':
				color = '#8FF062';
				text = "Resume";
				break;
			case 'menuAbout':
				color = '#FF4F4F';
				text = "About";
				break;
		}
		showShade(color, text);
	};
	menuItems.mouseenter(menuItems_mouseenter);

	menuItems.click(function() {
		$('.contentHolder').hide();
		var newContentHolder;
		switch (this.id) {
			case 'menuDashboard':
				newContentHolder = $('#contDashboard');
				break;
			case 'menuProjects':
				newContentHolder = $('#contProjects');
				break;
			case 'menuResume':
				newContentHolder = $('#contResume');
				break;
			case 'menuAbout':
				newContentHolder = $('#contAbout');
				$('#divConsole').html('chris@chrisloughney.com:~$');
				setTimeout(function() {
					runExecutable(AboutExecutable);
				}, 1000);
				break;
		}
		newContentHolder.show();
		hideShade();
		menuItems.off('mouseenter');
		setTimeout(function() {
			menuItems.mouseenter(menuItems_mouseenter);
		}, 300);
	});
} initNavigation();

$('#divConsole').html('chris@chrisloughney.com:~$');
setTimeout(function() {
	runExecutable(AboutExecutable);
}, 1000);