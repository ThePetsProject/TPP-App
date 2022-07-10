import * as mapboxgl from 'mapbox-gl';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsService } from 'src/app/account/private/services/pets.service';
import { SelectOptions } from 'src/app/shared/interfaces/select-input';
import { LoaderService } from 'src/app/services/loader.service';
import { isSubset } from 'src/app/shared/utils/objects';
import { LocationService } from 'src/app/services/location.service';
import { catchError, EMPTY, switchMap } from 'rxjs';

interface PetMarkerPet {
  specie: string;
  size: string;
  status: 'lost' | 'found';
  name?: string;
  age?: string;
  color?: string;
}

export interface PetMarker {
  id: string;
  lng: number;
  lat: number;
  pet: PetMarkerPet;
}

@Component({
  selector: 'app-pets-map',
  templateUrl: './pets-map.component.html',
  styleUrls: ['./pets-map.component.scss'],
})
export class PetsMapComponent implements OnInit {
  lat = 0;
  lng = 0;
  lostLat!: number;
  lostLng!: number;

  map!: mapboxgl.Map;
  lostMap!: mapboxgl.Map;
  tempMarkers = [] as mapboxgl.Marker[];
  lostMapAddress!: string;

  showAddLostPetModalForm = false;

  petsFilterForm!: FormGroup;
  addLostPetForm!: FormGroup;

  addLostPetErrorMessage = '';
  isAddLostPetSuccess!: boolean;

  filtered = false;

  specieSelectData: SelectOptions[] = [
    {
      selectValue: 'dog',
      selectLabel: 'Perro',
    },
    {
      selectValue: 'cat',
      selectLabel: 'Gato',
    },
  ];

  statusSelectData: SelectOptions[] = [
    {
      selectValue: 'lost',
      selectLabel: 'Perdida',
    },
    {
      selectValue: 'found',
      selectLabel: 'Encontrada',
    },
  ];

  sizeSelectData: SelectOptions[] = [] as SelectOptions[];

  /**
   * Markers data
   */
  petsMarkersOriginal = [] as PetMarker[];
  petsMarkersVisible = [] as PetMarker[];
  // {
  //   id: '123ahs1',
  //   lng: -70.7563,
  //   lat: -33.4691,
  //   description: 'La descripción corta de la mascota. <br>Un espacio.',
  //   pet: {
  //     status: 'lost',
  //     specie: 'dog',
  //     name: 'Nombre Mascota',
  //     age: '2.5y',
  //     size: 'large',
  //     color: 'Café',
  //   },
  // }

  @ViewChild('mapLost')
  mapLost!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private petsService: PetsService,
    private loaderService: LoaderService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoiYWxmYWpvcnMiLCJhIjoiY2lpYXprZHk5MDE0NHdlbHoxeW9nb3VhcCJ9.ECqkPMIYu9mCnck3GWKEyQ';

    this.locationService
      .getPosition()
      .pipe(
        catchError(() => {
          this.setMap();
          this.setData();
          return EMPTY;
        }),
        switchMap((positionResponse: any) => {
          const { latitude, longitude } = positionResponse.coords;
          this.lat = latitude;
          this.lng = longitude;
          return this.petsService.getLostPets();
        })
      )
      .subscribe((lostPets) => {
        this.petsMarkersOriginal = lostPets.map((lostPet) => ({
          id: lostPet.petId,
          lng: lostPet.lng,
          lat: lostPet.lat,
          pet: {
            specie: lostPet.specie,
            size: lostPet.size,
            status: lostPet.status,
          },
        }));

        Object.assign(this.petsMarkersVisible, this.petsMarkersOriginal);
        this.setMap(this.lng, this.lat);
        this.setData();
      });

    this.sizeSelectData = this.petsService.getSizesSelectData();
    this.setFilterForm();
    this.setLostPetForm();
  }

  processLostPetsData() {
    this.petsService.getLostPets().subscribe((lostPets) => {
      this.petsMarkersOriginal = lostPets.map((lostPet) => ({
        id: lostPet.petId,
        lng: lostPet.lng,
        lat: lostPet.lat,
        pet: {
          specie: lostPet.specie,
          size: lostPet.size,
          status: lostPet.status,
        },
      }));

      Object.assign(this.petsMarkersVisible, this.petsMarkersOriginal);
      this.setData();
    });
  }

  setLostPetForm() {
    this.addLostPetForm = this.fb.group({
      specie: ['', [Validators.required]],
      size: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  setFilterForm() {
    this.petsFilterForm = this.fb.group({
      specie: [''],
      size: [''],
      status: [''],
    });
  }

  setMap(lng = 0, lat = 0, forMarking = false) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14,
      failIfMajorPerformanceCaveat: true,
      maxZoom: 15,
      minZoom: 13,
    });
  }

  setLostPetLngLat(lng: number, lat: number) {
    this.lostLng = lng;
    this.lostLat = lat;
  }

  /**
   * Lost Map
   */
  setLostMap() {
    if (this.lostMap) return;

    this.lostMap = new mapboxgl.Map({
      container: this.mapLost.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng, this.lat],
      zoom: 14,
      failIfMajorPerformanceCaveat: true,
      maxZoom: 15,
      minZoom: 13,
    });

    this.setLostPetLngLat(this.lng, this.lat);

    this.locationService
      .getAddress(this.lng.toString(), this.lat.toString())
      .subscribe((address) => (this.lostMapAddress = address));

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.lostMap);

    this.lostMap.on('dragend', () => {
      const { lng, lat } = this.lostMap.getCenter();
      this.setLostPetLngLat(lng, lat);
      marker.setLngLat([lng, lat]);
      this.locationService
        .getAddress(lng.toString(), lat.toString())
        .subscribe((address) => (this.lostMapAddress = address));
    });

    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      this.setLostPetLngLat(lng, lat);
      this.lostMap.flyTo({
        center: [lng, lat],
      });
      this.locationService
        .getAddress(lng.toString(), lat.toString())
        .subscribe((address) => (this.lostMapAddress = address));
    });
  }

  /**
   * Set markers data
   */
  setData() {
    if (this.petsMarkersVisible.length < 1) return;

    this.petsMarkersVisible.forEach((markerData) => {
      const { lng, lat, pet } = markerData;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<p>${pet.specie}</p>`)
        .setMaxWidth('300px');

      const markerColor = pet.status === 'found' ? '#3FB1CE' : '#8b5cf6';

      const marker: mapboxgl.Marker = new mapboxgl.Marker({
        color: markerColor,
      })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      this.tempMarkers.push(marker);
    });
  }

  cleanMarkers() {
    if (this.tempMarkers.length) {
      this.tempMarkers.forEach((marker) => marker.remove());
    }
  }

  resetFilter() {
    this.filtered = false;
    Object.keys(this.petsFilterForm.controls).forEach((key) =>
      this.petsFilterForm.get(key)?.setValue('')
    );
    Object.assign(this.petsMarkersVisible, this.petsMarkersOriginal);
    this.setData();
  }

  filterPets = () => {
    this.loaderService.setLoading(true);

    this.petsMarkersVisible = this.petsMarkersOriginal.filter((marker) => {
      const petData = marker.pet;
      let parsedControlsData = {} as PetMarkerPet;

      Object.keys(this.petsFilterForm.controls).map((controlName) => {
        const value = this.petsFilterForm.get(controlName)?.value;
        if (value.length > 0) {
          parsedControlsData[controlName as keyof PetMarkerPet] = value;
        }
      });
      return isSubset(petData, parsedControlsData);
    });

    this.filtered = true;
    this.cleanMarkers();
    this.setData();
    this.loaderService.setLoading(false);
  };

  /**
   * Modal
   */
  openLostModal() {
    this.showAddLostPetModalForm = true;
    this.setLostMap();
  }
  closeModal() {
    this.showAddLostPetModalForm = false;
  }

  /**
   * Save lost pet
   */
  saveLostPet = () => {
    const petData = {
      ...this.addLostPetForm.value,
      lat: this.lostLat,
      lng: this.lostLng,
    };
    this.petsService.saveLostPet(petData).subscribe({
      next: (response) => {
        this.closeModal();
        this.processLostPetsData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
}
