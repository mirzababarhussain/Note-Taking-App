<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Note::query();

    if ($search = $request->query('search')) {
        $query->where('title', 'like', "%$search%")
              ->orWhere('content', 'like', "%$search%");
    }

    return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        return Note::create($request->all());
    }

    public function show($id)
    {
        return Note::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);
        $note->update($request->all());
        return $note;
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();
        return response()->json(['message' => 'Note deleted']);
    }
}
