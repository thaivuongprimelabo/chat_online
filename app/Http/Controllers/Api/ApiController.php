<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Constants\ResultCode;
use App\Messages;
use App\Rooms;
use DB;

class ApiController extends Controller
{
    
    public function __construct() {
        $this->middleware(function ($request, $next) {
            
            // Check content-type
            $contentType = strtolower($_SERVER["CONTENT_TYPE"]);
            if ($contentType != 'application/json; charset=utf-8') {
                $result["code"] = ResultCode::CONTENT_TYPE_ERR;
                $result["data"] = [];
                return response()->json($result);
            }
            
            return $next($request);
        });
    }        
    
    
    /**
     * login
     */
    public function login(Request $request) {
        $result = [];
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        
        // Validator
        if($validator->fails()) {
            $result['code'] = ResultCode::VALIDATE_ERR;
            $result['data'] = [];
            return response()->json($result);
        }
        
        // Check login
        if(Auth::attempt($request->all())) {
            $result['code'] = ResultCode::SUCCESS;
            $result['data'] = Auth::user();
        } else {
            $result['code'] = ResultCode::LOGIN_FAILED;
            $result['data'] = [];
        }
        
        return response()->json($result);
    }
    
    /**
     * register
     */
    public function register(Request $request) {
        $result = [];
        
        $data = $request->all();
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        
        // Validator
        if($validator->fails()) {
            $result['code'] = ResultCode::VALIDATE_ERR;
            $result['data'] = [];
            return response()->json($result);
        }
        
        // Create user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        
        if($user) {
            $result['code'] = ResultCode::SUCCESS;
            $result['data'] = $user;
            return response()->json($result);
        }
        
        return response()->json();
    }
    
    /**
     * addMessage
     */
    public function addMessage(Request $request) {
        
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:255'
        ]);
        
        $data = $request->all();
        
        // Validator
        if($validator->fails()) {
            $result['code'] = ResultCode::VALIDATE_ERR;
            $result['data'] = [];
            return response()->json($result);
        }
        
        // Add message
        $message = Messages::create([
           'user_id' => $data['user_id'],
           'room_id' => $data['room_id'],
           'friend_id' => $data['friend_id'],
           'content' => $data['content']
        ]);

        $message = Messages::select('messages.*','users.name')->where('messages.id',$message['id'])
                            ->leftJoin('users','users.id','=','messages.user_id')
                            ->first();
        
        if($message) {
            $result['code'] = ResultCode::SUCCESS;
            $result['data'] = $message;
            return response()->json($result);
        }
        
        return response()->json();
    }
    
    /**
     * createRoom
     */
    public function createRoom(Request $request) {
        $data = $request->all();
        
        $room = new Rooms();
        
        $room->owner_id = $data['owner_id'];
        
        $room->save();
        
        if($room) {
            
            $result['code'] = ResultCode::SUCCESS;
            $result['data'] = $room;
            return response()->json($result);
            
        }
        
        return response()->json();
    }

    /**
     * getMessage
     */
    public function getMessageList(Request $request) {
        $data = $request->all();
        $wheres = [];
        $orWheres = [];
        if(isset($data['user_id'])) {
            $wheres[] = ['user_id', '=', $data['user_id']];
            $orWheres[] = ['user_id', '=', $data['friend_id']];
        }

        if(isset($data['friend_id'])) {
            $wheres[] = ['friend_id', '=', $data['friend_id']];
            $orWheres[] = ['friend_id', '=', $data['user_id']];
        }

        // if(isset($data['room_id'])) {
        //     $wheres[] = ['room_id', '=', $data['room_id']];
        // }
        $messages = Messages::select('messages.*',DB::raw('CASE WHEN user_id = ' . $data['user_id'] . ' THEN 1 ELSE 0 END AS type'),'users.name')
                            ->leftJoin('users','users.id','=','messages.user_id')
                            ->where($wheres)
                            ->orWhere($orWheres)
                            ->get();

        if($messages) {

            $result['code'] = ResultCode::SUCCESS;
            $result['data'] = $messages;
            return response()->json($result);

        }

        return response()->json();
    }
    
}
