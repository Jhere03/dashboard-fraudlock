<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detection;

class DetectionController extends Controller
{
        public function getData(Request $request)
        {
            $startDate = $request->query('start');
            $endDate = $request->query('end');

            $query = Detection::select('fecha', \DB::raw('FORMAT(time / detections, 2) AS promedio'));

            if ($startDate && $endDate) {
                // Si se especifican fechas, devuelve los registros en el rango
                $query->whereBetween('fecha', [$startDate, $endDate]);
            } else {
                // Si no se especifican fechas, limita la consulta a los últimos 10 registros
                $query->orderBy('fecha', 'desc')->take(9);
            }

            $detections = $query->get();
            
            return response()->json($detections);
        }

    public function getDetectionRateData(Request $request)
        {
            $startDate = $request->query('start');
            $endDate = $request->query('end');

            $query = Detection::select('fecha', 'sites', 'detections');

            if ($startDate && $endDate) {
                $query->whereBetween('fecha', [$startDate, $endDate]);
            } else {
                $query->orderBy('fecha', 'desc')->take(9);
            }

            $detectionRates = $query->get();
            
            return response()->json($detectionRates);
        }

    public function getDetectionCountData(Request $request)
        {
            $startDate = $request->query('start');
            $endDate = $request->query('end');

            $query = Detection::select('fecha', 'detections');

            if ($startDate && $endDate) {
                $query->whereBetween('fecha', [$startDate, $endDate]);
            } else {
                $query->orderBy('fecha', 'desc')->take(9);
            }

            $detectionCounts = $query->get();
            
            return response()->json($detectionCounts);
        }

    public function getDetectionRatePercentageData(Request $request)
        {
            $startDate = $request->query('start');
            $endDate = $request->query('end');

            $query = Detection::select(
                'fecha',
                \DB::raw('(detections / sites) * 100 AS tasa_det')
            );

            if ($startDate && $endDate) {
                $query->whereBetween('fecha', [$startDate, $endDate]);
            } else {
                $query->orderBy('fecha', 'desc')->take(9);
            }

            $detectionPercentages = $query->get();
            
            return response()->json($detectionPercentages);
        }
        }