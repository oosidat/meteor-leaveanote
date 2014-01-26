Notes = new Meteor.Collection("notes");

Meteor.startup(function () {
// code to run on server at startup
});

var colours = ["yellowsticky", "pinksticky", 
'bluesticky', 'greensticky']

Meteor.methods({
	addNote : function(noteText){
		console.log("Adding your note!");
		var colour = colours[Math.floor(
			Math.random()*colours.length)];
		
		var noteId = Notes.insert({
			'noteText' : noteText,
			'submittedOn' : UtcDateTimeNow(),
			'stickyColor': colour
		});
		return noteId;
	}
});

function UtcDateTimeNow() {
	var now = new Date();
	var now_utc = new Date(
		now.getUTCFullYear(), 
		now.getUTCMonth(), 
		now.getUTCDate(), 
		now.getUTCHours(), 
		now.getUTCMinutes(), 
		now.getUTCSeconds());

	return now_utc;
}