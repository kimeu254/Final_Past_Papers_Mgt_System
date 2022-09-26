<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculties;
use \Response;


class FacultiesController extends Controller
{
    
    public function index()
    {
        return Faculties::all();
    }

    
    public function store(Request $request)
    {
        $faculty = Faculties::create($request->all());

        return Response::json($faculty);
    }

    public function update(Request $request, $id)
    {
        $faculty = Faculties::find($id);
        $faculty->update($request->all());
        return $faculty;
    }

    
    public function destroy($id)
    {
        return Faculties::destroy($id);
    }
}
