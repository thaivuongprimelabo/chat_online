<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function react()
    {
        return view('react');
    }
    
    public function vue() {
        return view('vue');
    }

    public function product() {
        return view('product');
    }
    
    public function payment(Request $request) {
        if(isset($_GET['PayerID'])) {
            $paymentId = $_GET['paymentId'];
            $payerId = $_GET['PayerId'];
            $bearerToken = '';
            if($request->session()->has('bearerToken')) {
                $bearerToken = $request->session()->get('bearerToken');
            }
            $urlExecute = 'https://api.sandbox.paypal.com/v1/payments/payment/'.$paymentId.'/execute';
            $params = [
                'payer_id' => $payerId
            ];
            
            $respExecute = $this->curl('post', $urlExecute, $params, [], 'json', $bearerToken);
            exit;
        }
        // Get token
        $urlGetToken = 'https://api.sandbox.paypal.com/v1/oauth2/token';
        $authen = [
            'username' => 'ASXVywlKdubN_wl8jSzZEWes4vfjbt-Q3HjC9pekJQu0MqGEEytGAn74dW9Q2BQTYS2ND6kqRgMeHOtS',
            'password' => 'EBM8l87R22WdggveUlkpmHZFCUfnSiSwohXQd4Bv2MJ-BPwWdINvyuWduR1vz3qnOgh1CqaCPaG76oju'
        ];
        $header = 'default';
        $params = [
            'grant_type' => 'client_credentials'
        ];
        $respToken = $this->curl('post', $urlGetToken, $params, $authen, $header);
        
        $respToken = json_decode($respToken);
        $accessToken = $respToken->access_token;
        
        // Payment
        $urlPayment = 'https://api.sandbox.paypal.com/v1/payments/payment';
        $bearerToken = $accessToken;
        
        $request->session()->put('bearerToken', $bearerToken);
        
        $params = [
            'intent' => 'sale',
            'redirect_urls' => [
                'return_url' => 'http://chat.local/payment',
                'cancel_url' => 'http://chat.local/payment'
            ],
            'payer' => [
                'payment_method' => 'paypal'
            ],
            'transactions' => [[
                'amount' => [
                    'total' => 1,
                    'currency' => 'USD'
                ],
                'description' => 'Iphone X Payment'
            ]]
        ];
        
        $respPayment = $this->curl('post', $urlPayment, $params, [], 'json', $bearerToken);
        
        $respPayment = json_decode($respPayment);
        
        $approveUrl = $respPayment->links[1]->href;
        return redirect($approveUrl);
    }
        
    public function paymentSuccess() {
//         $params = [
//             'intent' => 'sale',
//             'redirect_urls' => [
//                 'return_url' => 'http://chat.local/payment-success',
//                 'cancel_url' => 'http://chat.local/payment-success'
//             ],
//             'payer' => [
//                 'payment_method' => 'paypal'
//             ],
//             'transactions' => [
//                 'amount' => [
//                     'total' => 1,
//                     'currency' => 'USD'
//                 ],
//                 'description' => 'Iphone X Payment'
//             ]
//         ];
        echo 'Payment success';
    }
    
    public function curl($method = 'post', $url = "", $params = [], $authen = [], $header = 'default', $bearerToken = '') {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        
        // use a proxy
        if (env('CURLOPT_HTTPPROXYTUNNEL')) {
            curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, env('CURLOPT_HTTPPROXYTUNNEL'));
            curl_setopt($ch, CURLOPT_PROXY, env('CURLOPT_PROXY'));
            curl_setopt($ch, CURLOPT_PROXYPORT, env('CURLOPT_PROXYPORT'));
        }
        
        
        // neu ko dung POST, mac dinh method cua curl la GET
        if ($method == 'post') {
            if ($header == 'default') {
                // ko dung header, mac dinh header la application/x-www-form-urlencoded
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $this->buildQuery($params));
            } elseif ($header == 'json') {
                if($bearerToken != '') {
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , 'Authorization: Bearer ' . $bearerToken ));
                } else {
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
                }
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            }
        }
        
        if (!empty($authen)) {
            curl_setopt($ch, CURLOPT_USERPWD, $authen['username'] . ":" . $authen['password']);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        }
        
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $result = curl_exec($ch);
        if (curl_errno($ch) !== 0) {
            \Log::Info('cURL error when connecting to ' . $url . ': ' . curl_error($ch));
        }
        
        curl_close($ch);
        return $result;
    }
    
    public function buildQuery($params) {
        $query = '';
        if (is_array($params) && !empty($params)) {
            foreach ($params as $key => $param) {
                if (!is_array($param)) {
                    $query .= $key . '=' . $param . '&';
                } else {
                    foreach ($param as $item) {
                        $query .= $key . '=' . $item . '&';
                    }
                }
            }
        }
        
        if (strlen($query) > 1) {
            $query = substr($query, 0, strlen($query) - 1);
        }
        
        return $query;
    }
}
