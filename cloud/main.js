//Parse.initialize('A3fAQqXKDGRLkQZb0hxxQbmBcaOjkK1sMsaWgHfz', '
//nOLmwT7FdkgO03BBlSrhZyelhlarWalharVZYxKT', 'v3u3GgCCuQq1LLtFjP3M36lo4Jp9REU6Y8WXFaRE');
//Parse.serverURL = "https://gm-okhi.back4app.io/";

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('auth', function (request, response) {
	
	response.success(request.body);
	var username = req.body.username;
	var password = req.body.password;
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", username);
    query.first({ useMasterKey: true }).then(function(res){
		//response.success({success:true, data: res})
		    Parse.User.logIn(username, password,
			 {
				// If the username and password matches
				success: function(user) {
                response.success({success:true, data: user, msg: user.getSessionToken()})
            },
            // If there is an error
            error: function(user, error) {
                response.success({success:false, data: error, msg: user})
            }
			 });
	})

});


Parse.Cloud.define('getAddress', function (request, response) {
    var query = new Parse.Query(Parse.AddressFoundationLayer);
    //query.equalTo("username", "+254717511708");
	//query.equalTo('password', '​254717511708');
	//response.success("Hello " + query);
    query.find({ useMasterKey: true }).then(function(res){
		response.success({success:true, data: res})
	})

});