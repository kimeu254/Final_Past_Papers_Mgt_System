<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PastPapers;
use \Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class PastPapersController extends Controller
{
    public function index()
    {
        return PastPapers::all();
    }

    public function upload(Request $request){
            
        $request->validate([
           'file' => 'required|mimes:doc,pdf|max:2048',
           'title' => 'required',
           'unit_id' => 'required',
           'exam_year' => 'required',
        ]);

        $fileUpload = new PastPapers();

        if($request->file()) {
            $file_name = time().'_'.$request->file->getClientOriginalName();
            $file_path = $request->file('file')->move(public_path(), $file_name);
            // die($file_name);

            $fileUpload->name = time().'_'.$request->file->getClientOriginalName();
            $fileUpload->path = '/storage/' . $file_path;
            $fileUpload->title = $request->title;
            $fileUpload->unit_id = $request->unit_id;
            $fileUpload->user_id = Auth::user()->id;
            $fileUpload->exam_year = $request->exam_year;
            $fileUpload->save();

            return response()->json(['success'=>'File uploaded successfully.']);
        }
   }
}
