# phone-business

Core part of phone-device custom element. It obtains location and sends to server.

phone-business includes
*   core-ajax
*   geo-location

sends data to server
*   specified period
*   as soon as geo-location obtaines

phone-business needs remote url for sending data.

```html
<!-- specified period -->
<phone-business url="http://localhost:3000/tracking" period="5000"> </phone-business>

<!-- or, as soon as geo-location obtaines-->
<phone-business url="http://localhost:3000/tracking" period="location"></phone-business>
```