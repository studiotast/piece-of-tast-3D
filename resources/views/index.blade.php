<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code structuring</title>
    @vite('resources/assets/style.css')
  </head>
  <body>
    <canvas class="webgl"></canvas>
    @vite('resources/assets/script.js')
    <script>
       var csrf_token = '{{ csrf_token() }}';
    </script>
  </body>
</html>