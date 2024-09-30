<!doctype html>
<html lang="en">

<head>

  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="application-name" content="MyApp" />
  <meta name="apple-mobile-web-app-title" content="StukjeTast" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <link rel="apple-touch-icon" href="/icon.png" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://use.typekit.net/qxf5lla.css" />
  <script src="https://kit.fontawesome.com/7258cbfd4b.js" crossorigin="anonymous"></script>
  <title>Stukje tast fysiek</title>
  @vite('resources/assets/style.css')
</head>

<body>
  <canvas class="webgl"></canvas>
  <div class='tast-logo'>
    <img src='images/tast-logo-white.png' />
  </div>
  <p id='text' class="visible">
    Een stukje tast...
    <br />
    <br />
    In deze galerij vind je de volledige verzameling van geadopteerde stukjes Tast. Deel ook jouw leermoment, bewonder de blokjes en ontdek wat anderen hebben gedeeld.
    <br />
    <br />
    <span>Draai aan de kubus om te navigeren</span>
  </p>
  <div class='bottom'>
    <div class='left'>
      <div id='home-icon'>
        <i class="fa-light fa-home"></i>
      </div>
      <div id='angle-icon'>
        <i class="fa-light fa-angle-90"></i>
      </div>
    </div>
    <p id="block-number">#--</p>
  </div>
  <div class='circle-wrapper'>
    <div id='circle'>
      <i class="fa-solid fa-thought-bubble"></i>
    </div>
    <div id='block-text'>
      ---
    </div>

    <div id='overlay'>
      <div class='half-circle'></div>
      <img class="frame" src="images/overlay.png" />
    </div>
  </div>
  @vite('resources/assets/script.js')
  <script>
    var csrf_token = '{{ csrf_token() }}';
  </script>
</body>

</html>