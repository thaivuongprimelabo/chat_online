<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Product</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <style>
        </style>
    </head>
    <body>
        <div id="root">
        	<form method="post" action="{{ URL::to('payment') }}">
        		@csrf
        		<input type="hidden" name="id" value="1" />
        		<input type="hidden" name="price" value="12" />
            	<h3>Iphone X</h3>
            	<img src="{{ URL::to('upload/iphone-x-64gb-1-400x460.png') }}" width="150" />
            	<p><span>12 USD</span></p>
            	<p><button id="paypal-button"	>Payment</button></p>
        	</form>
        </div>
    </body>
    
</html>
