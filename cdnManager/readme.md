CDN Manager Read Me
===================
The CDN Manager is used to manage JavaScript libraries in a site to support Script Editor web parts.
To get started:
1. Download the project
2. Change the SiteUrl property to refer to one of your sites
3. Hit F5 to start debugging

You can use the following code directly in a script editor web part to try it out.

Simply jQuery
  ```JavaScript

  <script>
  CDNManager.getScript('jquery-1.11.2.min.js',function() {
  jQuery('.menu-item-text').css('color','red');
  });
  </script>

  ```

Knockout and jQuery loading simultaneously
  ```JavaScript

  <div>
  <div data-bind='text: firstName'></div>
  <div data-bind='text: lastName'></div>
  </div>
  <script>
  CDNManager.getScript(['jquery-1.11.2.min.js','knockout-2.2.1.js'],function() {
    var viewModel = {
    'firstName': ko.observable('Scot'),
    'lastName': ko.observable('Hillier')
    };
    ko.applyBindings(viewModel);
  });
  </script>

  ```
