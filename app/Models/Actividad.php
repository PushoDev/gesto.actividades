<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Actividad extends Model
{
    use HasFactory;

    protected $table = 'actividades';

    protected $fillable = [
        'user_id',
        'tipo_actividad',
        'institucion',
        'nombre_actividad',
        'dia',
        'hora',
        'lugar',
        'manifestacion',
        'talento',
        'grupos_etarios',
        'proyectos_socioculturales',
        'programa_tributa',
        'descripcion',
    ];

    protected function casts(): array
    {
        return [
            'dia' => 'date',
            'hora' => 'datetime',
            'talento' => 'array',
            'grupos_etarios' => 'array',
            'proyectos_socioculturales' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getFechaCompletaAttribute(): string
    {
        return $this->dia->format('d/m/Y') . ' ' . $this->hora->format('H:i');
    }

    public function getTipoActividadLabelAttribute(): string
    {
        return match ($this->tipo_actividad) {
            'modelo_general' => 'Modelo General',
            'comunidad_transformacion' => 'Comunidad en Transformación',
            default => $this->tipo_actividad,
        };
    }

    public function getEsProximaAttribute(): bool
    {
        return $this->dia >= now()->startOfDay();
    }
}
