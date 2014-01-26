Notes = new Meteor.Collection("notes");


/* Get Notes */
Template.notes.items = function(){
    return Notes.find({},{sort:{'submittedOn':-1}});
}


/* Add note */
Template.addnote.events({
	'click #add-note-button' : function(event){
		event.preventDefault();
		var noteText = $("#noteInput").val();

		if (!(/\S/.test(noteText))) {
			$("#noteInput").attr("placeholder", "No empties!");
			console.log("Can't add an empty note!");
		
		} else {

			$("#noteInput").attr("placeholder", "Leave your note here!");
			
			Meteor.call("addNote",noteText,function(error , noteId){
			console.log('added note with Id .. ' + noteId);
			});

		}
		$("#noteInput").val("");
	}
});


/* Nicely formatted Date */
Template.note.helpers({
	localDateTime: function() {
		
		var utcTime = this.submittedOn;
		return formatAMPM(utcTime);
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