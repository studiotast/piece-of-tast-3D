<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
</head>

<body class="antialiased">
    <div id="app"></div>
   @include('index')
    <script>
        var csrf_token = '<?php echo csrf_token(); ?>';
    </script>
</body>

</html>
