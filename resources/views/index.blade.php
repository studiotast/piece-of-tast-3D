<!doctype html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://use.typekit.net/qxf5lla.css" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Code structuring</title>
  @vite('resources/assets/style.css')
</head>

<body>
  <canvas class="webgl"></canvas>
  <div class='bottom'>
    <div class='left'>
      <div>
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div>
        <FontAwesomeIcon icon={faAngle90} />
      </div>
    </div>
    <p id="modulo-number">#11</p>
  </div>
  <div class='circle'></div>
  <img class="overlay" src="images/overlay.png" />
  @vite('resources/assets/script.js')
  <script>
    var csrf_token = '{{ csrf_token() }}';
  </script>
</body>

</html>