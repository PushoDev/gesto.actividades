import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Building, Calendar, MapPin, Users } from 'lucide-react';
import type { BreadcrumbItem, PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/actividades';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface Props extends PageProps {
    manifestaciones: Record<string, string>;
    talentos: Record<string, string>;
    gruposEtarios: Record<string, string>;
    proyectosSocioculturales: Record<string, string>;
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
        title: 'Crear Actividad',
        href: '#',
    },
];

export default function CrearActividad({
    manifestaciones,
    talentos,
    gruposEtarios,
    proyectosSocioculturales,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_actividad: 'modelo_general',
        institucion: '',
        nombre_actividad: '',
        dia: '',
        hora: '',
        lugar: '',
        manifestacion: '',
        talento: [] as string[],
        grupos_etarios: [] as string[],
        proyectos_socioculturales: [] as string[],
        programa_tributa: '',
        descripcion: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store().url, {
            onSuccess: () => reset(),
        });
    };

    const handleCheckboxChange = (
        field: 'talento' | 'grupos_etarios' | 'proyectos_socioculturales',
        value: string,
        checked: boolean,
    ) => {
        if (checked) {
            setData(field, [...data[field], value]);
        } else {
            setData(
                field,
                data[field].filter((item) => item !== value),
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Actividad" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/actividades">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Nueva Actividad
                        </h1>
                        <p className="text-muted-foreground">
                            Registra una nueva actividad cultural
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <Label htmlFor="tipo_actividad">
                                        Tipo de Actividad
                                    </Label>
                                    <Select
                                        value={data.tipo_actividad}
                                        onValueChange={(value: string) =>
                                            setData('tipo_actividad', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="modelo_general">
                                                Modelo General
                                            </SelectItem>
                                            <SelectItem value="comunidad_transformacion">
                                                Comunidad en Transformación
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={errors.tipo_actividad}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="institucion">
                                        <Building className="mr-2 inline h-4 w-4" />
                                        Institución
                                    </Label>
                                    <Input
                                        id="institucion"
                                        value={data.institucion}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData(
                                                'institucion',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Nombre de la institución"
                                    />
                                    <InputError message={errors.institucion} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nombre_actividad">
                                    Nombre de la Actividad
                                </Label>
                                <Input
                                    id="nombre_actividad"
                                    value={data.nombre_actividad}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        setData(
                                            'nombre_actividad',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Ej: Concierto de Música Clásica"
                                />
                                <InputError message={errors.nombre_actividad} />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="dia">
                                        <Calendar className="mr-2 inline h-4 w-4" />
                                        Fecha
                                    </Label>
                                    <Input
                                        id="dia"
                                        type="date"
                                        value={data.dia}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => setData('dia', e.target.value)}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                    />
                                    <InputError message={errors.dia} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hora">Hora</Label>
                                    <Input
                                        id="hora"
                                        type="time"
                                        value={data.hora}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => setData('hora', e.target.value)}
                                    />
                                    <InputError message={errors.hora} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lugar">
                                    <MapPin className="mr-2 inline h-4 w-4" />
                                    Lugar (opcional)
                                </Label>
                                <Input
                                    id="lugar"
                                    value={data.lugar}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setData('lugar', e.target.value)}
                                    placeholder="Ej: Casa de la Cultura Manzanillo"
                                />
                                <InputError message={errors.lugar} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="manifestacion">
                                    Manifestación Cultural
                                </Label>
                                <Select
                                    value={data.manifestacion}
                                    onValueChange={(value: string) =>
                                        setData('manifestacion', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona la manifestación" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(manifestaciones).map(
                                            ([key, label]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.manifestacion} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detalles Adicionales */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles Adicionales</CardTitle>
                            <CardDescription>
                                Información complementaria de la actividad
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Talento */}
                            <div className="space-y-3">
                                <Label>
                                    <Users className="mr-2 inline h-4 w-4" />
                                    Talento Participante
                                </Label>
                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    {Object.entries(talentos).map(
                                        ([key, label]) => (
                                            <div
                                                key={key}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`talento-${key}`}
                                                    checked={data.talento.includes(
                                                        key,
                                                    )}
                                                    onCheckedChange={(
                                                        checked: boolean,
                                                    ) =>
                                                        handleCheckboxChange(
                                                            'talento',
                                                            key,
                                                            checked,
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`talento-${key}`}
                                                    className="cursor-pointer text-sm font-normal"
                                                >
                                                    {label}
                                                </Label>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <InputError message={errors.talento} />
                            </div>

                            <Separator />

                            {/* Grupos Etarios */}
                            <div className="space-y-3">
                                <Label>Grupos Etarios</Label>
                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    {Object.entries(gruposEtarios).map(
                                        ([key, label]) => (
                                            <div
                                                key={key}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`grupo-${key}`}
                                                    checked={data.grupos_etarios.includes(
                                                        key,
                                                    )}
                                                    onCheckedChange={(
                                                        checked: boolean,
                                                    ) =>
                                                        handleCheckboxChange(
                                                            'grupos_etarios',
                                                            key,
                                                            checked,
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`grupo-${key}`}
                                                    className="cursor-pointer text-sm font-normal"
                                                >
                                                    {label}
                                                </Label>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <InputError message={errors.grupos_etarios} />
                            </div>

                            <Separator />

                            {/* Proyectos Socioculturales */}
                            <div className="space-y-3">
                                <Label>Proyectos Socioculturales</Label>
                                <div className="grid gap-3 md:grid-cols-2">
                                    {Object.entries(
                                        proyectosSocioculturales,
                                    ).map(([key, label]) => (
                                        <div
                                            key={key}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`proyecto-${key}`}
                                                checked={data.proyectos_socioculturales.includes(
                                                    key,
                                                )}
                                                onCheckedChange={(
                                                    checked: boolean,
                                                ) =>
                                                    handleCheckboxChange(
                                                        'proyectos_socioculturales',
                                                        key,
                                                        checked,
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={`proyecto-${key}`}
                                                className="cursor-pointer text-sm font-normal"
                                            >
                                                {label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <InputError
                                    message={errors.proyectos_socioculturales}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="programa_tributa">
                                    Programa que Tributa (opcional)
                                </Label>
                                <Input
                                    id="programa_tributa"
                                    value={data.programa_tributa}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        setData(
                                            'programa_tributa',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Ej: Programa de Desarrollo Cultural"
                                />
                                <InputError message={errors.programa_tributa} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="descripcion">
                                    Descripción (opcional)
                                </Label>
                                <Textarea
                                    id="descripcion"
                                    value={data.descripcion}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>,
                                    ) => setData('descripcion', e.target.value)}
                                    placeholder="Describe los detalles de la actividad..."
                                    rows={4}
                                />
                                <InputError message={errors.descripcion} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Botones de Acción */}
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : 'Crear Actividad'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/actividades">Cancelar</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
