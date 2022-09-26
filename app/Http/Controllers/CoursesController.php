<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Courses;
use \Response;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Courses::all();
       
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCoursesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $course = Courses::create($request->all());
        return Response::json($course);   
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCoursesRequest  $request
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $course = Courses::find($id);
        $course->update($request->all());
        return $course;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Courses::destroy($id);
    }
}
