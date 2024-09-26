<!doctype html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://use.typekit.net/qxf5lla.css" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://kit.fontawesome.com/7258cbfd4b.js" crossorigin="anonymous"></script>
  <title>Stukje tast fysiek</title>
  @vite('resources/assets/style.css')
</head>

<body>
  <canvas class="webgl"></canvas>
  <div class='bottom'>
    <div class='left'>
      <div>
        <i class="fa-solid fa-home"></i>
      </div>
      <div>
        <i class="fa-solid fa-angle-90"></i>
      </div>
    </div>
    <p id="block-number">#11</p>
  </div>
  <div id='overlay'>
    <div class='circle'></div>
    <img class="frame" src="images/overlay.png" />
  </div>
  @vite('resources/assets/script.js')
  <script>
    var csrf_token = '{{ csrf_token() }}';
  </script>
</body>

</html>