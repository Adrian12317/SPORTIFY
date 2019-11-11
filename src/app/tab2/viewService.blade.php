@extends('company.diagnosticoServicios.serviciosEmpresa')
@section('section-diagnostic-detalle')
  @php
    $company = Auth()->user()->company;
  @endphp
<div class="box box-primary down-scroll">
        <div class="box-header with-border">
            <h3 class="box-title">Información del servicio</h3>
            <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                    <div class="form-group margin-botton-2">
                        <div class="">
                            <label for="">Nombre del Servicio</label>
                        </div>
                        <div class="answer-company">
                            <label id="" class="text-muted">{{$servicio->name_service}}</label>
                        </div>
                    </div>
                    <div class="form-group margin-botton-2">
                        <div class="">
                            <label for="">Descripción del servicio</label>
                        </div>
                        <div class="answer-company">
                            <label id="" class="text-muted">{{$servicio->description_service}}</label>
                        </div>
                    </div>
                    <div class="form-group margin-botton-2">
                        <div class="">
                            <label >Características del servicio</label>
                        </div>
                        <div class="margin-botton-3">
                            @foreach ($servicio->characteristicsServices as $key => $item)
                                <div class="col-sm-4 cutom-nowrap no-padding-left">
                                    <span class="fas fa-{{$item->icon_name_cs}} text-aqua"></span>{{$item->value}}
                                </div>
                            @endforeach

                        </div>
                    </div>
                    <div class="form-group margin-botton-2">
                        <div class="">
                            <label for="">El ciclo de elaboración de su servicio</label>
                        </div>
                        <div class="answer-company ">
                            <label id="" class="text-muted">
                                @if ($servicio->elaboration_cycle =='TEMP')
                                    Por temporada
                                @else
                                    @if ($servicio->elaboration_cycle =='CONT')
                                        Continuo
                                    @endif
                                @endif
                            </label>
                        </div>
                    </div>
                    @if ($servicio->elaboration_cycle =='TEMP')
                        <div class="form-group margin-botton-2">
                            <div class="">
                                <label >Temporada del año, su producción aumenta regularmente</label>
                            </div>
                            <div>
                                <div class="row">
                                    @foreach ($servicio->seasonServices as $key => $item)
                                    <div class="col-sm-2 cutom-nowrap">
                                        <i class="fas fa-dot-circle text-aqua"></i>{{$item->value}}
                                    </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>

                    @endif
                    <div class="form-group margin-botton-2">
                        <div class="">
                            <label >Característica o ventaja principal de la marca</label>
                        </div>
                        <div class="answer-company">
                            <label id="" class="text-muted">{{$servicio->main_characteristic}}</label>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    </div>
@endsection
