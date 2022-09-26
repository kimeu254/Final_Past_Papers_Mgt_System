<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use \Response;
use Illuminate\Support\Facades\Auth;

class NewUsersController extends Controller
{
    public function create(Request $request)
    {
        $user = User::create([
            'first_name' => $request->firstname,
            'last_name' => $request->lastname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $user;
    }
}
