<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PastPapers;
use \Response;
use Illuminate\Support\Facades\Auth;

class PastPapersController extends Controller
{
    public function upload(Request $request){
            
        $request->validate([
           'file' => 'required|mimes:jpg,jpeg,png,csv,txt,xlx,xls,pdf|max:2048',
           'title' => 'required',
           'unit_id' => 'required',
        ]);

        $fileUpload = new PastPapers();

        if($request->file()) {
            $file_name = time().'_'.$request->file->getClientOriginalName();
            $file_path = $request->file('file')->storeAs('uploads', $file_name, 'public');

            $fileUpload->name = time().'_'.$request->file->getClientOriginalName();
            $fileUpload->path = '/storage/' . $file_path;
            $fileUpload->title = $request->title;
            $fileUpload->unit_id = $request->unit_id;
            $fileUpload->user_id = Auth::user()->id;
            $fileUpload->save();

            return response()->json(['success'=>'File uploaded successfully.']);
        }
   }
}
