(function() {
	$("#save-alert").hide();
	$("#spin").hide();

	// start the connection with firebase DB
	var ref = new Firebase("https://noter-1.firebaseio.com");
	ref.onAuth(function(authData) {
		if (authData) {
	    console.log("User " + authData.uid + " is logged in with " + authData.provider);
	    $("#login-form").hide();
	    $("#logout-div").html("<form class='navbar-form navbar-right' role='form'><button id='logout-but' class='btn btn-success'>Logout</button> </form>");
	  	readNotes(authData);
	  } else {
	    console.log("User is logged out");
	    $("#login-form").show();
	    $("#logout-div").html("");
	  }
	});

	//
	function readNotes(authData) {
    var readRef = new Firebase("https://noter-1.firebaseio.com/users/" + authData.uid);
    readRef.on("value", function(snapshot) {
      //console.log("The notes: " + JSON.stringify(snapshot.val()));
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var noteTime = timeConverter(key);
        var noteData = childSnapshot.val();
        //console.log("key: "+ key + " data: "+noteData);
        $("#notes-list").append(
        	'<div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">' + 
        	noteData.title + " ( " + noteTime + " )" +
        	'</h3> </div> <div class="panel-body"> '+ noteData.full_note + ' </div> </div>'
        	);
      });
    });
	}

	//
	$("#logout-but").click(function() {
		ref.unauth();
		return false;
	});

	// Init the editor
	$("#main-editor").markdown({
		autofocus:true, 
		savable:true,
		onSave: function(e) {
			// TODO: take it to a function
			console.log("Saving '" + e.getContent() + "'...");
			ref.onAuth(function(authData) {
			  if (authData) {
			  	console.log("User " + authData.uid + " is logged in with " + authData.provider);
			  	var unixTime = Math.floor(Date.now() / 1000);
			  	var fullDate = new Date().toString();
			  	var lines = $('textarea').val().split('\n');
 					var title = lines[0];
					var usersRef = ref.child("users");
					usersRef.child(authData.uid).child(unixTime).set({
				    title: title,
				    note_date: fullDate,
				    full_note: e.getContent()
					});
					$("#save-alert").show();
          $("#save-alert").fadeTo(1000, 500).slideUp(500, function(){
    	    	$("#save-alert").hide();
          });  
					
			  }
			  else {
			  	console.log("User is logged out");
			  	// TODO: show the login form
			  }
			});
		},
		onChange: function(e){
			console.log("- note changed -");
		},
		onBlur: function(e) {
			console.log("-- Not blur triggered --");
			$("#err-modal").modal('show');
		}
	});

	// Sign in
	$("#sign-in-but").click(function() {
			$("#spin").show();
	    var u_email  = $("#email").val();
	    var u_passwd = $("#passwd").val();
	    ref.authWithPassword({
	    email    : u_email,
	    password : u_passwd
	  }, function(error, authData) {
	  	$("#spin").hide();
	    if (error) {
	      console.log("Login Failed!", error);
	      $("#err-modal").modal('show');
	    } else {
	      console.log("Authenticated successfully with payload:", authData);
	    }
	  });
	  return false;  
	});

	//
	// utils
	//
	function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  return time;
	}


})();
