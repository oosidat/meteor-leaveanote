Notes = new Meteor.Collection("notes");

Meteor.startup(function () {
// code to run on server at startup
});

var colours = ["yellowsticky", "pinksticky", 'bluesticky', 'greensticky']

Meteor.methods({
	addNote : function(noteText){
		console.log("Adding your note!");
		var today = new Date();
		var colour = colours[Math.floor(Math.random()*colours.length)];
		var noteId = Notes.insert({
			'noteText' : noteText,
			'submittedOn' : today,
			'formattedDate': formatAMPM(today),
			'stickyColor': colour
		});
		return noteId;
	}
});

var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

function formatAMPM(dateObj) {
	var day = dayNames[dateObj.getDay()];
	var date = dateObj.getDate();
	var month = monthNames[dateObj.getMonth()];
	var year = dateObj.getFullYear();
	var hours = dateObj.getHours();
	var minutes = dateObj.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = day + ", " + month + " " + date + " " + year + ", " + hours + ':' + minutes + ' ' + ampm;
	return strTime;
}