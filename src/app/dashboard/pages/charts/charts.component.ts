import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements  OnInit {

  public chart: any;
  public barriosPorCiudad: any[] = [];
  public barriosPorCiudadX: any[] = [];
  public barriosPorCiudadY: any[] = [];


  //inject dashboard service using inject sintaxis
  constructor(private dashboardService: DashboardServiceService) { }



    ngOnInit() {

      this.dashboardService.obtenerBarrios().subscribe((barrios: any) => {
        console.log(barrios)
        let barriosParse: any[] = []
        barrios.forEach((barrio:any) => {
          barriosParse.push({
            barrio: barrio.nombreBarrio,
            ciudad: barrio.ciudad.Nombre
          })
        });
        this.barriosPorCiudad = barriosParse;

        //agrupar por nombre de ciudad (cantidad de barrios)
        let barriosPorCiudad: any[] = [];
        let ciudades: any[] = [];
        this.barriosPorCiudad.forEach((barrio: any) => {
          if (!ciudades.includes(barrio.ciudad)) {
            ciudades.push(barrio.ciudad)
          }
        })
        ciudades.forEach((ciudad: any) => {
          let barriosFiltrados = this.barriosPorCiudad.filter((barrio: any) => barrio.ciudad === ciudad)
          barriosPorCiudad.push({
            ciudad: ciudad,
            cantidadBarrios: barriosFiltrados.length
          })
          this.barriosPorCiudadX = [...this.barriosPorCiudadX, ciudad]
          this.barriosPorCiudadY = [...this.barriosPorCiudadY, barriosFiltrados.length]
        })

        console.log(this.barriosPorCiudadX, this.barriosPorCiudadY)
        this.createChart('MyChart', 'Barrios por ciudad', this.barriosPorCiudadX, this.barriosPorCiudadY, "cyan");
      })

      this.dashboardService.obtenerViajes().subscribe((viajes: any) => {
        viajes.forEach((viaje: any)  => {
          console.log(viaje)
          const fechahora = viaje.fechahoraInicio.split('T')[0]

          //agrupar por fecha (cantidad de viajes)
          let viajesPorFecha: any[] = [];
          let fechas: any[] = [];
          viajes.forEach((viaje: any) => {
            if (!fechas.includes(viaje.fechahoraInicio.split('T')[0])) {
              fechas.push(viaje.fechahoraInicio.split('T')[0])
            }
          })
          fechas.forEach((fecha: any) => {
            let viajesFiltrados = viajes.filter((viaje: any) => viaje.fechahoraInicio.split('T')[0] === fecha)
            viajesPorFecha.push({
              fecha: fecha,
              cantidadViajes: viajesFiltrados.length
            })
          })
          console.log(viajesPorFecha)

          this.createChart('MyChart2', 'Viajes por fecha', fechas, viajesPorFecha.map((viaje: any) => viaje.cantidadViajes), "yellow");
        })
      })


    }

    createChart(selector: string, titulo: string, x: any[], y: any[], color: string){

      this.chart = new Chart(selector, {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: x, 
           datasets: [
            {
              label: titulo,
              data:y,
              backgroundColor: color
            },
          ]
        },
        options: {
          aspectRatio:2.5
        }
        
      });
    }

}
