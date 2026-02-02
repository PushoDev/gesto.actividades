<?php

namespace App\Http\Controllers;

use App\Models\Actividad;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ActividadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $actividades = Actividad::with('user')
            ->where('user_id', Auth::id())
            ->orderBy('dia', 'desc')
            ->orderBy('hora', 'desc')
            ->get()
            ->map(function ($actividad) {
                return [
                    'id' => $actividad->id,
                    'tipo_actividad' => $actividad->tipo_actividad,
                    'tipo_actividad_label' => $actividad->tipo_actividad_label,
                    'institucion' => $actividad->institucion,
                    'nombre_actividad' => $actividad->nombre_actividad,
                    'dia' => $actividad->dia->format('Y-m-d'),
                    'hora' => $actividad->hora->format('H:i'),
                    'lugar' => $actividad->lugar,
                    'manifestacion' => $actividad->manifestacion,
                    'talento' => $actividad->talento,
                    'grupos_etarios' => $actividad->grupos_etarios,
                    'proyectos_socioculturales' => $actividad->proyectos_socioculturales,
                    'programa_tributa' => $actividad->programa_tributa,
                    'descripcion' => $actividad->descripcion,
                    'fecha_completa' => $actividad->fecha_completa,
                    'es_proxima' => $actividad->es_proxima,
                    'created_at' => $actividad->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Actividades/Index', [
            'actividades' => $actividades,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Actividades/Create', [
            'manifestaciones' => [
                'Música' => 'Música',
                'Teatro' => 'Teatro',
                'Danza' => 'Danza',
                'Artes Plásticas' => 'Artes Plásticas',
                'Literatura' => 'Literatura',
                'Cine' => 'Cine',
                'Fotografía' => 'Fotografía',
                'Artesanías' => 'Artesanías',
                'Gastronomía' => 'Gastronomía',
                'Otras' => 'Otras',
            ],
            'talentos' => [
                'Músicos' => 'Músicos',
                'Actores' => 'Actores',
                'Bailarines' => 'Bailarines',
                'Artistas plásticos' => 'Artistas plásticos',
                'Escritores' => 'Escritores',
                'Directores' => 'Directores',
                'Fotógrafos' => 'Fotógrafos',
                'Artesanos' => 'Artesanos',
                'Cocineros' => 'Cocineros',
                'Otros' => 'Otros',
            ],
            'gruposEtarios' => [
                'Niños' => 'Niños',
                'Adolescentes' => 'Adolescentes',
                'Jóvenes' => 'Jóvenes',
                'Adultos' => 'Adultos',
                'Adultos mayores' => 'Adultos mayores',
            ],
            'proyectosSocioculturales' => [
                'Educación cultural' => 'Educación cultural',
                'Patrimonio' => 'Patrimonio',
                'Inclusión social' => 'Inclusión social',
                'Desarrollo comunitario' => 'Desarrollo comunitario',
                'Turismo cultural' => 'Turismo cultural',
                'Arte y terapia' => 'Arte y terapia',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tipo_actividad' => 'required|in:modelo_general,comunidad_transformacion',
            'institucion' => 'required|string|max:255',
            'nombre_actividad' => 'required|string|max:255',
            'dia' => 'required|date|after_or_equal:today',
            'hora' => 'required|date_format:H:i',
            'lugar' => 'nullable|string|max:255',
            'manifestacion' => 'required|string|max:255',
            'talento' => 'nullable|array',
            'talento.*' => 'string|max:255',
            'grupos_etarios' => 'nullable|array',
            'grupos_etarios.*' => 'string|max:255',
            'proyectos_socioculturales' => 'nullable|array',
            'proyectos_socioculturales.*' => 'string|max:255',
            'programa_tributa' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:2000',
        ]);

        $validated['user_id'] = Auth::id();

        Actividad::create($validated);

        return redirect()->route('actividades.index')
            ->with('success', 'Actividad creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Actividad $actividad): Response
    {
        if ($actividad->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Actividades/Show', [
            'actividad' => [
                'id' => $actividad->id,
                'tipo_actividad' => $actividad->tipo_actividad,
                'tipo_actividad_label' => $actividad->tipo_actividad_label,
                'institucion' => $actividad->institucion,
                'nombre_actividad' => $actividad->nombre_actividad,
                'dia' => $actividad->dia->format('Y-m-d'),
                'hora' => $actividad->hora->format('H:i'),
                'lugar' => $actividad->lugar,
                'manifestacion' => $actividad->manifestacion,
                'talento' => $actividad->talento,
                'grupos_etarios' => $actividad->grupos_etarios,
                'proyectos_socioculturales' => $actividad->proyectos_socioculturales,
                'programa_tributa' => $actividad->programa_tributa,
                'descripcion' => $actividad->descripcion,
                'fecha_completa' => $actividad->fecha_completa,
                'es_proxima' => $actividad->es_proxima,
                'created_at' => $actividad->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $actividad->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Actividad $actividad): Response
    {
        if ($actividad->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Actividades/Edit', [
            'actividad' => [
                'id' => $actividad->id,
                'tipo_actividad' => $actividad->tipo_actividad,
                'institucion' => $actividad->institucion,
                'nombre_actividad' => $actividad->nombre_actividad,
                'dia' => $actividad->dia->format('Y-m-d'),
                'hora' => $actividad->hora->format('H:i'),
                'lugar' => $actividad->lugar,
                'manifestacion' => $actividad->manifestacion,
                'talento' => $actividad->talento,
                'grupos_etarios' => $actividad->grupos_etarios,
                'proyectos_socioculturales' => $actividad->proyectos_socioculturales,
                'programa_tributa' => $actividad->programa_tributa,
                'descripcion' => $actividad->descripcion,
            ],
            'manifestaciones' => [
                'Música' => 'Música',
                'Teatro' => 'Teatro',
                'Danza' => 'Danza',
                'Artes Plásticas' => 'Artes Plásticas',
                'Literatura' => 'Literatura',
                'Cine' => 'Cine',
                'Fotografía' => 'Fotografía',
                'Artesanías' => 'Artesanías',
                'Gastronomía' => 'Gastronomía',
                'Otras' => 'Otras',
            ],
            'talentos' => [
                'Músicos' => 'Músicos',
                'Actores' => 'Actores',
                'Bailarines' => 'Bailarines',
                'Artistas plásticos' => 'Artistas plásticos',
                'Escritores' => 'Escritores',
                'Directores' => 'Directores',
                'Fotógrafos' => 'Fotógrafos',
                'Artesanos' => 'Artesanos',
                'Cocineros' => 'Cocineros',
                'Otros' => 'Otros',
            ],
            'gruposEtarios' => [
                'Niños' => 'Niños',
                'Adolescentes' => 'Adolescentes',
                'Jóvenes' => 'Jóvenes',
                'Adultos' => 'Adultos',
                'Adultos mayores' => 'Adultos mayores',
            ],
            'proyectosSocioculturales' => [
                'Educación cultural' => 'Educación cultural',
                'Patrimonio' => 'Patrimonio',
                'Inclusión social' => 'Inclusión social',
                'Desarrollo comunitario' => 'Desarrollo comunitario',
                'Turismo cultural' => 'Turismo cultural',
                'Arte y terapia' => 'Arte y terapia',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Actividad $actividad): RedirectResponse
    {
        if ($actividad->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'tipo_actividad' => 'required|in:modelo_general,comunidad_transformacion',
            'institucion' => 'required|string|max:255',
            'nombre_actividad' => 'required|string|max:255',
            'dia' => 'required|date|after_or_equal:today',
            'hora' => 'required|date_format:H:i',
            'lugar' => 'nullable|string|max:255',
            'manifestacion' => 'required|string|max:255',
            'talento' => 'nullable|array',
            'talento.*' => 'string|max:255',
            'grupos_etarios' => 'nullable|array',
            'grupos_etarios.*' => 'string|max:255',
            'proyectos_socioculturales' => 'nullable|array',
            'proyectos_socioculturales.*' => 'string|max:255',
            'programa_tributa' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:2000',
        ]);

        $actividad->update($validated);

        return redirect()->route('actividades.index')
            ->with('success', 'Actividad actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Actividad $actividad): RedirectResponse
    {
        if ($actividad->user_id !== Auth::id()) {
            abort(403);
        }

        $actividad->delete();

        return redirect()->route('actividades.index')
            ->with('success', 'Actividad eliminada exitosamente.');
    }
}