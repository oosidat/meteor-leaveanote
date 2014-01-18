Notes = new Meteor.Collection("notes");

Meteor.startup(function () {
// code to run on server at startup
});

Meteor.methods({
	addNote : function(noteText){
		console.log("Adding your note!");
		var noteId = Notes.insert({
			'noteText' : noteText,
			'submittedOn' : new Date()
		});
		return noteId;
	}
});