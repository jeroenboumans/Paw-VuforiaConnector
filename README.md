# VuforiaConnector extension for Paw

![Screenshot](https://raw.githubusercontent.com/jeroenboumans/Paw-VuforiaConnector/master/Screenshot.png)

## About

Use VuforiaConnector to get your raw ImageTargets data from the VWS Api.


### Install 

You can install VuforiaConnector via Paw's [Dynamic Values extensions page](https://paw.cloud/extensions?extension_type=dynamic_value#).


### Test - GET all ImageTargets

1. Create a new request and choose **GET** as the request method.
2. Set the url to the base targets url: **https://vws.vuforia.com/targets**.
3. Add the following headers:
  * **Authorization**: Vuforia Authorization (Double click it to fill in the **Access Key** and **Sectet Key**).
  * **Date**: Timestamp RFC 1123/2822
  * **Content-Type**: application/json
4. Run the request.

### Request Types VWS

* GET https://vws.vuforia.com/targets - Retreive all ImageTarget
* POST https://vws.vuforia.com/targets - Add new ImageTarget
* GET https://vws.vuforia.com/targets/{id} - Retreive an ImageTarget
* GET https://vws.vuforia.com/duplicates/{id} - Retreive all possible duplicates of an ImageTarget
* PUT https://vws.vuforia.com/targets/{id} - Update a ImageTarget
* DELETE https://vws.vuforia.com/targets/{id} - Delete an ImageTarget

* GET https://vws.vuforia.com/summary - Get a summary of the database
* GET https://vws.vuforia.com/summary/{id} - Get a summary of an ImageTarget

**PUT** and **POST** require bdoy JSON data:

![Screenshot](https://raw.githubusercontent.com/jeroenboumans/Paw-VuforiaConnector/master/Screenshot_json.png)

## License

This Paw Extension is released under the [MIT License](LICENSE). Feel free to fork, and modify!

Copyright © 2017 Studio Noorderlicht - Jeroen Boumans
