import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Users,
    Building,
    Edit,
    Trash2,
    User,
    UserPlus,
    Star,
    Clock,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { edit, destroy } from '@/routes/actividades';
import type { BreadcrumbItem, PageProps } from '@/types';

interface Profesional {
    tipo: string;
    nombre: string;
    apellidos: string;
    ocupacion: string;
}

interface Aficionado {
    categoria: string;
    nombre: string;
    apellidos: string;
    ocupacion: string;
}

interface Actividad {
    id: number;
    tipo_actividad: string;
    tipo_actividad_label: string;
    institucion: string;
    nombre_actividad: string;
    dia: string;
    hora: string;
    lugar: string | null;
    manifestacion: string;
    talento: string[] | null;
    talento_detallado: {
        profesionales: Profesional[];
        aficionados: Aficionado[];
    } | null;
    grupos_etarios: string[] | null;
    proyectos_socioculturales: string[] | null;
    programa_tributa: string | null;
    descripcion: string | null;
    fecha_completa: string;
    es_proxima: boolean;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    actividad: Actividad;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Actividades',
        href: '/actividades',
    },
    {
        title: 'Detalles de la Actividad',
        href: '#',
    },
];

export default function DetallesActividad({ actividad }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${actividad.nombre_actividad} - Detalles`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/actividades">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Link>
                    </Button>
                    <div>
                        <h1 className="line-clamp-2 text-3xl font-bold tracking-tight">
                            {actividad.nombre_actividad}
                        </h1>
                        <p className="text-muted-foreground">
                            Detalles completos de la actividad cultural
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Información Principal */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Información Básica */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Básica</CardTitle>
                                <CardDescription>
                                    Datos principales de la actividad
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            Tipo de Actividad
                                        </Label>
                                        <Badge
                                            variant="outline"
                                            className="w-fit"
                                        >
                                            {actividad.tipo_actividad_label}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            <Building className="mr-2 inline h-4 w-4" />
                                            Institución
                                        </Label>
                                        <p className="text-sm">
                                            {actividad.institucion}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        Manifestación Cultural
                                    </Label>
                                    <Badge variant="default" className="w-fit">
                                        <Users className="mr-2 h-3 w-3" />
                                        {actividad.manifestacion}
                                    </Badge>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            <Calendar className="mr-2 inline h-4 w-4" />
                                            Fecha y Hora
                                        </Label>
                                        <p className="text-sm font-medium">
                                            {actividad.fecha_completa}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            <Clock className="mr-2 inline h-4 w-4" />
                                            Estado
                                        </Label>
                                        <Badge
                                            variant={
                                                actividad.es_proxima
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            className="w-fit"
                                        >
                                            {actividad.es_proxima
                                                ? 'Próxima'
                                                : 'Pasada'}
                                        </Badge>
                                    </div>
                                </div>

                                {actividad.lugar && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            <MapPin className="mr-2 inline h-4 w-4" />
                                            Lugar
                                        </Label>
                                        <p className="text-sm">
                                            {actividad.lugar}
                                        </p>
                                    </div>
                                )}

                                {actividad.descripcion && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            Descripción
                                        </Label>
                                        <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                            {actividad.descripcion}
                                        </p>
                                    </div>
                                )}

                                {actividad.programa_tributa && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            Programa que Tributa
                                        </Label>
                                        <p className="text-sm">
                                            {actividad.programa_tributa}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Talento Artístico Detallado */}
                        {actividad.talento_detallado && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Talento Artístico</CardTitle>
                                    <CardDescription>
                                        Artistas participantes en la actividad
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Profesionales */}
                                    {actividad.talento_detallado.profesionales
                                        .length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <Label className="text-base font-semibold">
                                                    Profesionales (
                                                    {
                                                        actividad
                                                            .talento_detallado
                                                            .profesionales
                                                            .length
                                                    }
                                                    )
                                                </Label>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                {actividad.talento_detallado.profesionales.map(
                                                    (profesional, index) => (
                                                        <Card
                                                            key={index}
                                                            className="border-l-4 border-l-blue-500 p-4"
                                                        >
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="text-sm font-medium">
                                                                        {
                                                                            profesional.nombre
                                                                        }{' '}
                                                                        {
                                                                            profesional.apellidos
                                                                        }
                                                                    </h4>
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="text-xs"
                                                                    >
                                                                        {
                                                                            profesional.tipo
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        profesional.ocupacion
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Card>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Aficionados */}
                                    {actividad.talento_detallado.aficionados
                                        .length > 0 && (
                                        <div className="space-y-4">
                                            {actividad.talento_detallado
                                                .profesionales.length > 0 && (
                                                <Separator />
                                            )}

                                            <div className="flex items-center gap-2">
                                                <UserPlus className="h-4 w-4" />
                                                <Label className="text-base font-semibold">
                                                    Aficionados (
                                                    {
                                                        actividad
                                                            .talento_detallado
                                                            .aficionados.length
                                                    }
                                                    )
                                                </Label>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                {actividad.talento_detallado.aficionados.map(
                                                    (aficionado, index) => (
                                                        <Card
                                                            key={index}
                                                            className="border-l-4 border-l-green-500 p-4"
                                                        >
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="text-sm font-medium">
                                                                        {
                                                                            aficionado.nombre
                                                                        }{' '}
                                                                        {
                                                                            aficionado.apellidos
                                                                        }
                                                                    </h4>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {
                                                                            aficionado.categoria
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        aficionado.ocupacion
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Card>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sin artistas */}
                                    {actividad.talento_detallado.profesionales
                                        .length === 0 &&
                                        actividad.talento_detallado.aficionados
                                            .length === 0 && (
                                            <div className="rounded-lg border-2 border-dashed py-8 text-center text-muted-foreground">
                                                <Users className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                                <p className="text-sm">
                                                    No hay artistas registrados
                                                    para esta actividad
                                                </p>
                                            </div>
                                        )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Acciones Rápidas */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Acciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full" asChild>
                                    <Link href={edit(actividad.id).url}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar Actividad
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <form
                                        onSubmit={(e) => {
                                            if (
                                                !confirm(
                                                    '¿Estás seguro de eliminar esta actividad?',
                                                )
                                            ) {
                                                e.preventDefault();
                                            } else {
                                                e.currentTarget.submit();
                                            }
                                        }}
                                        action={destroy(actividad.id).url}
                                        method="POST"
                                    >
                                        <input
                                            type="hidden"
                                            name="_method"
                                            value="DELETE"
                                        />
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                            Eliminar Actividad
                                        </Button>
                                    </form>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Información Adicional */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Adicional</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {actividad.grupos_etarios &&
                                    actividad.grupos_etarios.length > 0 && (
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">
                                                Grupos Etarios
                                            </Label>
                                            <div className="flex flex-wrap gap-1">
                                                {actividad.grupos_etarios.map(
                                                    (grupo, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {grupo}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {actividad.proyectos_socioculturales &&
                                    actividad.proyectos_socioculturales.length >
                                        0 && (
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">
                                                Proyectos Socioculturales
                                            </Label>
                                            <div className="flex flex-wrap gap-1">
                                                {actividad.proyectos_socioculturales.map(
                                                    (proyecto, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {proyecto}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                <Separator />

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        Fecha de Creación
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            actividad.created_at,
                                        ).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>

                                {actividad.updated_at !==
                                    actividad.created_at && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            Última Actualización
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                actividad.updated_at,
                                            ).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
