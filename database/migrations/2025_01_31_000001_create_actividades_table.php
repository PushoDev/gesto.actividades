<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actividades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // El dueño del registro
            $table->enum('tipo_actividad', ['modelo_general', 'comunidad_transformacion'])->default('modelo_general');

            $table->string('institucion');
            $table->string('nombre_actividad');
            $table->date('dia');
            $table->time('hora');
            $table->string('lugar')->nullable();
            $table->string('manifestacion');

            // Aquí vive la estructura compleja que definiste
            $table->json('talento')->nullable();
            $table->json('grupos_etarios')->nullable();
            $table->json('proyectos_socioculturales')->nullable();

            $table->string('programa_tributa')->nullable();
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actividades');
    }
};
