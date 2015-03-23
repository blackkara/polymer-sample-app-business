# app-business

app-business is part of imaginary phone-device custom element. It doesn't have visual, just obtaines location and sends location data to server making ajax operations.

app-business includes
*   core-ajax
*   geo-location

sends data to server
*   specified period
*   or, when as soon as geo-location obtaines

```html
<!-- specified period -->
<!-- geo-location updates lat&lng, app-business sends every 5000 seconds -->
<app-business url="http://localhost:3000/tracking" period="5000"> </app-business>

<!-- or, as soon as geo-location obtaines-->
<!-- geo-location updates lat&lng, app-business sends immediately -->
<app-business url="http://localhost:3000/tracking" period="location"></app-business>
```

also includes smyrna.json file that containes points between two location. If you pass demo attribute, it simulates these points with period and show on map.
```html
<!-- app-business.html -->
<link rel="import" href="imports.html">
<polymer-element name="app-business" constructor="AppBusiness"
    attributes="demo">
    ...
```

```javascript
/* app-business.html */
(function(){
    var demo_ = {};
    demo_.points = [];
    ...
    Polymer({
      demo: false,
      ready: function(){
        if(this.demo){
            // points comes from points.js file
            demo_.points = points;
            ...
        }
      }
      ...
    });
})();
```
```html
<app-business demo></app-busines>
```
