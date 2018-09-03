<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'Api\ApiController@login')->name('login');
Route::post('/register', 'Api\ApiController@register')->name('register');
Route::post('/resetPassword', 'Api\ApiController@resetPassword')->name('resetPassword');
Route::post('/add-message', 'Api\ApiController@addMessage')->name('addMessage');
Route::post('/create-room', 'Api\ApiController@createRoom')->name('createRoom');
Route::post('/get-message-list', 'Api\ApiController@getMessageList')->name('getMessageList');
Route::get('/get-user-list', 'Api\ApiController@getUserList')->name('getUserList');
Route::post('/send-file', 'Api\ApiController@sendFile')->name('getUsersendFileList');