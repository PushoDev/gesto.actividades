<?php


namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Actividad>
 */
class ActividadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'tipo_actividad' => fake()->randomElement(['modelo_general', 'comunidad_transformacion']),
            'institucion' => fake()->company(),
            'nombre_actividad' => fake()->sentence(3),
            'dia' => fake()->dateTimeBetween('now', '+6 months'),
            'hora' => fake()->dateTimeBetween('08:00', '22:00'),
            'lugar' => fake()->address(),
            'manifestacion' => fake()->randomElement(['Música', 'Teatro', 'Danza', 'Artes Plásticas', 'Literatura', 'Cine']),
            'talento' => fake()->randomElements([
                'Músicos',
                'Actores',
                'Bailarines',
                'Artistas plásticos',
                'Escritores',
                'Directores'
            ], fake()->numberBetween(1, 3)),
            'grupos_etarios' => fake()->randomElements([
                'Niños',
                'Adolescentes',
                'Jóvenes',
                'Adultos',
                'Adultos mayores'
            ], fake()->numberBetween(2, 4)),
            'proyectos_socioculturales' => fake()->randomElements([
                'Educación cultural',
                'Patrimonio',
                'Inclusión social',
                'Desarrollo comunitario'
            ], fake()->numberBetween(1, 2)),
            'programa_tributa' => fake()->optional(0.7)->company(),
            'descripcion' => fake()->paragraph(3),
        ];
    }
}
