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
import {
    Calendar,
    MapPin,
    Users,
    Plus,
    Eye,
    Edit,
    Trash2,
    User,
    UserPlus,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { create, show, edit, destroy } from '@/routes/actividades';
import type { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types';

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
}

interface Props extends PageProps {
    actividades: Actividad[];
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
];

export default function Actividades({ actividades }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Actividades" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Actividades
                        </h1>
                        <p className="text-muted-foreground">
                            Gestiona tus actividades culturales
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Actividad
                        </Link>
                    </Button>
                </div>

                {actividades.length === 0 ? (
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-lg">
                                No hay actividades
                            </CardTitle>
                            <CardDescription>
                                Comienza creando tu primera actividad cultural
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button asChild>
                                <Link href={create().url}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Crear Actividad
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {actividades.map((actividad) => (
                            <Card key={actividad.id} className="relative">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="line-clamp-2 text-lg">
                                                {actividad.nombre_actividad}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                {actividad.institucion}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant={
                                                actividad.es_proxima
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            className="ml-2"
                                        >
                                            {actividad.es_proxima
                                                ? 'Próxima'
                                                : 'Pasada'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{actividad.fecha_completa}</span>
                                    </div>

                                    {actividad.lugar && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span className="line-clamp-1">
                                                {actividad.lugar}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>{actividad.manifestacion}</span>
                                    </div>

                                    <Badge variant="outline" className="w-fit">
                                        {actividad.tipo_actividad_label}
                                    </Badge>

                                    {/* Talento Detallado */}
                                    {actividad.talento_detallado && (
                                        <div className="space-y-2">
                                            {actividad.talento_detallado
                                                .profesionales.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        <span className="text-xs font-medium">
                                                            {
                                                                actividad
                                                                    .talento_detallado
                                                                    .profesionales
                                                                    .length
                                                            }{' '}
                                                            Profesional
                                                            {actividad
                                                                .talento_detallado
                                                                .profesionales
                                                                .length !== 1
                                                                ? 'es'
                                                                : ''}
                                                        </span>
                                                    </div>
                                                    {actividad.talento_detallado.profesionales
                                                        .slice(0, 2)
                                                        .map((prof, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="default"
                                                                className="text-xs"
                                                            >
                                                                {prof.nombre}{' '}
                                                                {prof.apellidos}
                                                            </Badge>
                                                        ))}
                                                    {actividad.talento_detallado
                                                        .profesionales.length >
                                                        2 && (
                                                        <Badge
                                                            variant="default"
                                                            className="text-xs"
                                                        >
                                                            +
                                                            {actividad
                                                                .talento_detallado
                                                                .profesionales
                                                                .length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}

                                            {actividad.talento_detallado
                                                .aficionados.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <UserPlus className="h-3 w-3" />
                                                        <span className="text-xs font-medium">
                                                            {
                                                                actividad
                                                                    .talento_detallado
                                                                    .aficionados
                                                                    .length
                                                            }{' '}
                                                            Aficionado
                                                            {actividad
                                                                .talento_detallado
                                                                .aficionados
                                                                .length !== 1
                                                                ? 's'
                                                                : ''}
                                                        </span>
                                                    </div>
                                                    {actividad.talento_detallado.aficionados
                                                        .slice(0, 2)
                                                        .map((af, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {af.nombre}{' '}
                                                                {af.apellidos}
                                                            </Badge>
                                                        ))}
                                                    {actividad.talento_detallado
                                                        .aficionados.length >
                                                        2 && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            +
                                                            {actividad
                                                                .talento_detallado
                                                                .aficionados
                                                                .length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {actividad.grupos_etarios &&
                                        actividad.grupos_etarios.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {actividad.grupos_etarios
                                                    .slice(0, 3)
                                                    .map((grupo, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {grupo}
                                                        </Badge>
                                                    ))}
                                                {actividad.grupos_etarios
                                                    .length > 3 && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        +
                                                        {actividad
                                                            .grupos_etarios
                                                            .length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}

                                    <div className="flex items-center justify-between border-t pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(actividad.id).url}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Ver
                                            </Link>
                                        </Button>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        edit(actividad.id).url
                                                    }
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>

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
                                                action={
                                                    destroy(actividad.id).url
                                                }
                                                method="POST"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="_method"
                                                    value="DELETE"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    type="submit"
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
