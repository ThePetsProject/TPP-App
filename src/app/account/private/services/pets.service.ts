import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, throwError } from 'rxjs';
import {
  PetColorsEnum,
  PetSizesEnum,
  PetSpeciesEnum,
} from 'src/app/shared/enums/pet-data.enum';
import { environment } from 'src/environments/environment';

export enum PetDataMapEnum {
  'name' = 'Nombre',
  'microchipId' = 'Microchip',
  'age' = 'Edad',
  'species' = 'Especie',
  'breed' = 'Raza',
  'size' = 'Tamaño',
  'color' = 'Color',
  'description' = 'Descripción',
}

interface BreedData {
  breedId: string;
  breedName: string;
}

export interface BreedsDataRaw {
  _id: string;
  breeds: BreedData[];
}

export interface PetDataRaw {
  name: string;
  age: string;
  breed: string;
  color: string;
  description: string;
  microchipId: string;
  size: string;
  species: string;
}

export interface PetParsedData {
  Nombre: string;
  Edad: string;
  Raza: string;
  Color: string;
  Descripción: string;
  Microchip: string;
  Tamaño: string;
  Especie: string;
}

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  breedsData!: BreedsDataRaw[];
  species = [] as string[];

  constructor(private httpClient: HttpClient) {}

  getBreedForSpecie(specie: PetSpeciesEnum): BreedData[] {
    return this.breedsData.filter((breedData) => breedData._id === specie)[0]
      .breeds;
  }

  getBreedsRaw(): BreedsDataRaw[] {
    return this.breedsData;
  }

  setBreeds(breeds: BreedsDataRaw[]) {
    this.breedsData = breeds;
  }

  getSpecies(): string[] {
    return this.species;
  }

  setSpecies(breedsData: BreedsDataRaw[]) {
    this.species = breedsData.map((breedData) => breedData._id);
  }

  getSpeciesAndBreeds() {
    return this.getBreedsRawData().pipe(
      map((breedsDataRaw) => {
        this.setSpecies(breedsDataRaw);
        this.setBreeds(breedsDataRaw);
      })
    );
  }

  getBreedsRawData() {
    const getPetsDataUrl = `${environment.config.baseUrl}${environment.config.petsBreeds.path}`;

    return this.httpClient
      .get<BreedsDataRaw[]>(getPetsDataUrl, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error.message);
        })
      );
  }

  getPetsData() {
    const getPetsDataUrl = `${environment.config.baseUrl}${environment.config.petsSecure.path}`;

    return this.httpClient
      .get<PetDataRaw[]>(getPetsDataUrl, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error.message);
        })
      );
  }

  getSingleBreed(
    breedsData: BreedsDataRaw[],
    specie: string,
    breedId: string
  ): BreedData | undefined {
    const filteredData = breedsData.find(
      (breedsData) => breedsData._id === specie
    );
    const breed = filteredData?.breeds.find(
      (breedData) => breedData.breedId === breedId
    );
    return breed;
  }

  mapPetData(petData: PetDataRaw): PetParsedData {
    const { breed, color, size, species, microchipId, name, age, description } =
      petData;

    let parsedData: PetParsedData = {} as PetParsedData;
    const getBreed = this.getSingleBreed(this.breedsData, species, breed);
    const translatedData: PetDataRaw = {
      name,
      microchipId,
      age,
      species: PetSpeciesEnum[species as keyof typeof PetSpeciesEnum],
      breed: getBreed?.breedName || '',
      color,
      size: PetSizesEnum[size as keyof typeof PetSizesEnum],
      description,
    };

    Object.keys(petData).forEach((petDataKey: string) => {
      const translatedKey =
        PetDataMapEnum[petDataKey as keyof typeof PetDataMapEnum];

      parsedData[translatedKey] =
        translatedData[petDataKey as keyof typeof translatedData];
    });

    return parsedData;
  }

  /**
   * Save new pet data
   */

  setNewPet(petData: PetDataRaw) {
    const saveNewPetUrl = `${environment.config.baseUrl}${environment.config.petsSecure.path}`;

    return this.httpClient
      .post(saveNewPetUrl, {
        petData,
      })
      .pipe(
        catchError((error) => {
          const { status } = error;
          return throwError(() => ({
            message: error.message,
            status,
          }));
        })
      );
  }

  /**
   * Save new pet data
   */

  editPet(petData: PetDataRaw) {
    const saveNewPetUrl = `${environment.config.baseUrl}${environment.config.petsSecure.path}`;

    return this.httpClient
      .patch(saveNewPetUrl, {
        petData,
      })
      .pipe(
        catchError((error) => {
          const { status } = error;
          return throwError(() => ({
            message: error.message,
            status,
          }));
        })
      );
  }
}
