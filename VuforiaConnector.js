var VuforiaAuthorization = function() 
{
	this.evaluate = function(context) 
	{	
		var requestUuid = context.getCurrentRequest().id;
	  	
	  	var _METHOD = new DynamicValue('com.luckymarmot.RequestMethodDynamicValue', {  request: requestUuid });
	    var METHOD 	= _METHOD.getEvaluatedString();

	  	var _BODY 	= new DynamicValue('com.luckymarmot.RequestRawBodyDynamicValue', { request: requestUuid });
	    var BODY 	= _BODY.getEvaluatedString();

	    var _MD5	= new DynamicValue('com.luckymarmot.HashDynamicValue', { input: BODY, hashType: 2, encoding: 0 }); // MD5 
		var MD5 	= _MD5.getEvaluatedString();

		var _TYPE	= new DynamicValue('com.luckymarmot.RequestHeaderDynamicValue', { request: requestUuid, header: 'Content-Type'});
	    var TYPE 	= _TYPE.getEvaluatedString();

	    var _DATE 	= new DynamicValue('com.luckymarmot.RequestHeaderDynamicValue', { request: requestUuid, header: 'Date'});
	    var DATE 	= _DATE.getEvaluatedString();

	    var _URL 	= new DynamicValue('com.luckymarmot.RequestURLDynamicValue', { request: requestUuid, includeHost: false, includeParameters: true });
	    var URL 	= _URL.getEvaluatedString();

	    var SIGNATURE = METHOD + "\n" + MD5 + "\n" + TYPE + "\n" + DATE + "\n" + URL;

	    var _HMAC_SHA1 = new DynamicValue('com.luckymarmot.HMACDynamicValue', {
	        'key'		: this.server_secret_key,	// key is secret key
	        'input'		: SIGNATURE,				// get the signature
	        'algorithm'	: 1, 						// SHA1
	        'encoding' 	: 'Base64'					// BASE64 encoding
	    });
	    
	    var errors = [];

	    if(!DATE) errors.push('Add header: "Date" of type "Timestamp RFC 1123/2822"');
		if(!TYPE) errors.push('Add header: "Content-Type" of type "application/json"');

	    

	    var HMAC_SHA1 = _HMAC_SHA1.getEvaluatedString();
	    
	    if(errors.length > 0)
	    {
	    	var text = "";
		    for(var i = 0; i < errors.length; i++) text += (i > 0) ? "\n"+errors[i] : errors[i];
			return text;
	    }

	    return "VWS " + this.server_access_key + ":" + HMAC_SHA1;
	}

	this.title = function(context)
	{
		return "Vuforia";
	}

	this.text = function(context)
	{
		return "Authorization";
	}
}

VuforiaAuthorization.identifier = "nl.studionoorderlicht.PawExtensions.VuforiaConnector";
VuforiaAuthorization.title = "Vuforia Authorization";
VuforiaAuthorization.help = "https://studionoorderlicht.nl/VuforiaConnector/";
VuforiaAuthorization.inputs = [
	DynamicValueInput("server_access_key", "Server Access Key", "String"),
	DynamicValueInput("server_secret_key", "Server Secret Key", "SecureValue"), 
];


// call to register function is required
registerDynamicValueClass(VuforiaAuthorization)

