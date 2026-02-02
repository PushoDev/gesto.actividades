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
        'talento_detallado',
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
            'talento_detallado' => 'array',
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

    public function getProfesionalesAttribute(): array
    {
        return $this->talento_detallado['profesionales'] ?? [];
    }

    public function getAficionadosAttribute(): array
    {
        return $this->talento_detallado['aficionados'] ?? [];
    }

    public function getTotalArtistasAttribute(): int
    {
        return count($this->profesionales) + count($this->aficionados);
    }

    public function tieneProfesionales(): bool
    {
        return !empty($this->profesionales);
    }

    public function tieneAficionados(): bool
    {
        return !empty($this->aficionados);
    }
}
