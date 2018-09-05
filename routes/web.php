<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/react', 'HomeController@react')->name('react');
Route::get('/vue', 'HomeController@vue')->name('vue');
Route::get('/product', 'HomeController@product')->name('product');
Route::post('/payment', 'HomeController@payment')->name('paymentPost');
Route::get('/payment', 'HomeController@payment')->name('paymentGet');
Route::get('/payment-success', 'HomeController@paymentSuccess')->name('paymentSuccess');
