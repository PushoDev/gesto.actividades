import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Users,
    Building,
    Plus,
    Trash2,
    User,
    UserPlus,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/routes/actividades';
import type { BreadcrumbItem, PageProps } from '@/types';
import InputError from '@/components/input-error';

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

interface Props extends PageProps {
    actividad: {
        id: number;
        tipo_actividad: string;
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
    };
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
        title: 'Editar Actividad',
        href: '#',
    },
];

export default function EditarActividad({
    actividad,
    manifestaciones,
    talentos,
    gruposEtarios,
    proyectosSocioculturales,
}: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        tipo_actividad: actividad.tipo_actividad,
        institucion: actividad.institucion,
        nombre_actividad: actividad.nombre_actividad,
        dia: actividad.dia,
        hora: actividad.hora,
        lugar: actividad.lugar || '',
        manifestacion: actividad.manifestacion,
        talento: actividad.talento || [],
        talento_detallado: actividad.talento_detallado || {
            profesionales: [] as Profesional[],
            aficionados: [] as Aficionado[],
        },
        grupos_etarios: actividad.grupos_etarios || [],
        proyectos_socioculturales: actividad.proyectos_socioculturales || [],
        programa_tributa: actividad.programa_tributa || '',
        descripcion: actividad.descripcion || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(update(actividad.id).url, {
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

    const addProfesional = () => {
        setData('talento_detallado.profesionales', [
            ...data.talento_detallado.profesionales,
            { tipo: 'Subvencionado', nombre: '', apellidos: '', ocupacion: '' },
        ]);
    };

    const removeProfesional = (index: number) => {
        setData(
            'talento_detallado.profesionales',
            data.talento_detallado.profesionales.filter((_, i) => i !== index),
        );
    };

    const updateProfesional = (index: number, field: string, value: string) => {
        const profesionales = [...data.talento_detallado.profesionales];
        profesionales[index] = { ...profesionales[index], [field]: value };
        setData('talento_detallado.profesionales', profesionales);
    };

    const addAficionado = () => {
        setData('talento_detallado.aficionados', [
            ...data.talento_detallado.aficionados,
            {
                categoria: 'Generales',
                nombre: '',
                apellidos: '',
                ocupacion: '',
            },
        ]);
    };

    const removeAficionado = (index: number) => {
        setData(
            'talento_detallado.aficionados',
            data.talento_detallado.aficionados.filter((_, i) => i !== index),
        );
    };

    const updateAficionado = (index: number, field: string, value: string) => {
        const aficionados = [...data.talento_detallado.aficionados];
        aficionados[index] = { ...aficionados[index], [field]: value };
        setData('talento_detallado.aficionados', aficionados);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Actividad" />
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
                            Editar Actividad
                        </h1>
                        <p className="text-muted-foreground">
                            Modifica los datos de la actividad
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
                            {/* Talento Detallado */}
                            <div className="space-y-6">
                                <Label>
                                    <Users className="mr-2 inline h-4 w-4" />
                                    Talento Artístico
                                </Label>

                                {/* Profesionales */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold">
                                            Profesionales
                                        </Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addProfesional}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Agregar Profesional
                                        </Button>
                                    </div>

                                    {data.talento_detallado.profesionales.map(
                                        (profesional, index) => (
                                            <Card
                                                key={`profesional-${index}`}
                                                className="p-4"
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="text-sm font-medium">
                                                        Profesional #{index + 1}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeProfesional(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>

                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                                    <div className="space-y-2">
                                                        <Label>Tipo</Label>
                                                        <Select
                                                            value={
                                                                profesional.tipo
                                                            }
                                                            onValueChange={(
                                                                value: string,
                                                            ) =>
                                                                updateProfesional(
                                                                    index,
                                                                    'tipo',
                                                                    value,
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Subvencionado">
                                                                    Subvencionado
                                                                </SelectItem>
                                                                <SelectItem value="No Subvencionado">
                                                                    No
                                                                    Subvencionado
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.profesionales.${index}.tipo`
                                                                ]
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Nombre</Label>
                                                        <Input
                                                            value={
                                                                profesional.nombre
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                updateProfesional(
                                                                    index,
                                                                    'nombre',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Nombre"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.profesionales.${index}.nombre`
                                                                ]
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Apellidos</Label>
                                                        <Input
                                                            value={
                                                                profesional.apellidos
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                updateProfesional(
                                                                    index,
                                                                    'apellidos',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Apellidos"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.profesionales.${index}.apellidos`
                                                                ]
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Ocupación</Label>
                                                        <Input
                                                            value={
                                                                profesional.ocupacion
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                updateProfesional(
                                                                    index,
                                                                    'ocupacion',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Ej: Solista Cantante"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.profesionales.${index}.ocupacion`
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        ),
                                    )}

                                    {data.talento_detallado.profesionales
                                        .length === 0 && (
                                        <div className="rounded-lg border-2 border-dashed py-4 text-center text-muted-foreground">
                                            <UserPlus className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                            <p className="text-sm">
                                                No hay profesionales agregados
                                            </p>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={addProfesional}
                                                className="mt-2"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Agregar Primer Profesional
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                {/* Aficionados */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold">
                                            Aficionados
                                        </Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addAficionado}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Agregar Aficionado
                                        </Button>
                                    </div>

                                    {data.talento_detallado.aficionados.map(
                                        (aficionado, index) => (
                                            <Card
                                                key={`aficionado-${index}`}
                                                className="p-4"
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="text-sm font-medium">
                                                        Aficionado #{index + 1}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeAficionado(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>

                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                                    <div className="space-y-2">
                                                        <Label>Categoría</Label>
                                                        <Select
                                                            value={
                                                                aficionado.categoria
                                                            }
                                                            onValueChange={(
                                                                value: string,
                                                            ) =>
                                                                updateAficionado(
                                                                    index,
                                                                    'categoria',
                                                                    value,
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Generales">
                                                                    Generales
                                                                </SelectItem>
                                                                <SelectItem value="Municipal">
                                                                    Categoría
                                                                    Municipal
                                                                </SelectItem>
                                                                <SelectItem value="Provincial">
                                                                    Categoría
                                                                    Provincial
                                                                </SelectItem>
                                                                <SelectItem value="Nacional">
                                                                    Categoría
                                                                    Nacional
                                                                </SelectItem>
                                                                <SelectItem value="Portador de Tradiciones">
                                                                    Portador de
                                                                    Tradiciones
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.aficionados.${index}.categoria`
                                                                ]
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Nombre</Label>
                                                        <Input
                                                            value={
                                                                aficionado.nombre
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                updateAficionado(
                                                                    index,
                                                                    'nombre',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Nombre"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.aficionados.${index}.nombre`
                                                                ]
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Apellidos</Label>
                                                        <Input
                                                            value={
                                                                aficionado.apellidos
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                updateAficionado(
                                                                    index,
                                                                    'apellidos',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Apellidos"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.aficionados.${index}.apellidos`
                                                                ]
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Ocupación</Label>
                                                        <Input
                                                            value={
                                                                aficionado.ocupacion
                                                            }
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                updateAficionado(
                                                                    index,
                                                                    'ocupacion',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Ej: Bailarín"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `talento_detallado.aficionados.${index}.ocupacion`
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        ),
                                    )}

                                    {data.talento_detallado.aficionados
                                        .length === 0 && (
                                        <div className="rounded-lg border-2 border-dashed py-4 text-center text-muted-foreground">
                                            <User className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                            <p className="text-sm">
                                                No hay aficionados agregados
                                            </p>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={addAficionado}
                                                className="mt-2"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Agregar Primer Aficionado
                                            </Button>
                                        </div>
                                    )}
                                </div>
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
                            {processing
                                ? 'Guardando...'
                                : 'Actualizar Actividad'}
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
