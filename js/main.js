(function() {
	$("#save-alert").hide();

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
      console.log("The notes: " + JSON.stringify(snapshot.val()));
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var noteData = childSnapshot.val();
        console.log("key: "+ key + " data: "+noteData);
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
		}
	});

	// Sign in
	$("#sign-in-but").click(function() {
	    var u_email  = $("#email").val();
	    var u_passwd = $("#passwd").val();
	    ref.authWithPassword({
	    email    : u_email,
	    password : u_passwd
	  }, function(error, authData) {
	    if (error) {
	      console.log("Login Failed!", error);
	    } else {
	      console.log("Authenticated successfully with payload:", authData);
	    }
	  });
	  return false;  
	});

})();
