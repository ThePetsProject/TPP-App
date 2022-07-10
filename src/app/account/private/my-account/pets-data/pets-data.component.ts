import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PetSizesEnum,
  PetSpeciesEnum,
} from 'src/app/shared/enums/pet-data.enum';
import { SelectOptions } from 'src/app/shared/interfaces/select-input';
import {
  PetDataMapEnum,
  PetDataRaw,
  PetParsedData,
  PetsService,
} from '../../services/pets.service';

interface PetDataInput {
  controlName: string;
  label: string;
  type: 'select' | 'input';
  selectOptionsData?: SelectOptions[];
}

@Component({
  selector: 'app-pets-data',
  templateUrl: './pets-data.component.html',
  styleUrls: ['./pets-data.component.scss'],
})
export class PetsDataComponent implements OnInit {
  pets = [] as PetParsedData[];
  petsRaw = [] as PetDataRaw[];

  addPetInputs = [] as PetDataInput[];
  editPetInputs = [] as PetDataInput[];

  editPetForm!: FormGroup;
  addPetForm!: FormGroup;

  isAddPetSuccess!: boolean;
  isEditPetSuccess!: boolean;

  addPetErrorMessage!: string;
  editPetErrorMessage!: string;
  showEditModalForm = false;
  showAddModalForm = false;

  constructor(private petsService: PetsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.petsService.getSpeciesAndBreeds().subscribe((breedsDataRaw) => {
      this.getPetsData();
      this.buildPetForms();
    });
  }

  cleanAddPetForm() {
    Object.keys(this.addPetForm.value).forEach((controlName) => {
      this.addPetForm.get(controlName)?.setValue('');
      this.addPetForm
        .get(controlName)
        ?.setErrors({ valid: true, invalid: false });
    });
  }

  getSpeciesSelectData(): SelectOptions[] {
    const species = this.petsService.getSpecies();
    return species.map(
      (specie) =>
        ({
          selectLabel: PetSpeciesEnum[specie as keyof typeof PetSpeciesEnum],
          selectValue: specie,
        } as SelectOptions)
    );
  }

  getBreedsSelectData() {
    const breedsRaw = this.petsService.getBreedsRaw();
    let selectOptions = [] as SelectOptions[];
    breedsRaw.map((breedRaw) => {
      const breeds = breedRaw.breeds;
      breeds.map((breed) => {
        const breedsMapped = {
          selectLabel: breed.breedName,
          selectValue: breed.breedId,
        } as SelectOptions;
        selectOptions.push(breedsMapped);
      });
    });
    return selectOptions;
  }

  buildSelectData(controlName: string): SelectOptions[] {
    let selectOptions = [] as SelectOptions[];

    switch (controlName) {
      case 'species':
        selectOptions = this.getSpeciesSelectData();
        break;
      case 'breed':
        selectOptions = this.getBreedsSelectData();
        break;
      case 'size':
        selectOptions = this.petsService.getSizesSelectData();
        break;

      default:
        break;
    }

    return selectOptions;
  }

  populateEditPetInputs(microchipId: string) {
    const pet = this.petsRaw.filter(
      (petRaw) => petRaw.microchipId === microchipId
    )[0];
    this.editPetInputs.forEach((input) => {
      const { controlName } = input;
      const value = pet[controlName as keyof typeof pet];
      this.editPetForm.get(input.controlName)?.setValue(value);
    });
  }

  buildPetDataInputs() {
    Object.keys(PetDataMapEnum).forEach((key) => {
      const controlName = key;
      const label = PetDataMapEnum[controlName as keyof typeof PetDataMapEnum];

      const type =
        controlName === 'species' ||
        controlName === 'breed' ||
        controlName === 'size'
          ? 'select'
          : 'input';

      const inputFields: PetDataInput = {
        controlName,
        label,
        type,
        selectOptionsData:
          type === 'select' ? this.buildSelectData(controlName) : undefined,
      };

      this.addPetInputs.push(inputFields);
      this.editPetInputs.push(inputFields);
    });
  }

  buildPetForms() {
    this.buildPetDataInputs();
    this.buildAddPetForm();
    this.buildEditPetForm();
  }

  buildAddPetForm() {
    let fieldsGroup = {} as any;
    this.addPetInputs.forEach((input) => {
      fieldsGroup[input.controlName] = ['', [Validators.required]];
    });

    this.addPetForm = this.fb.group(fieldsGroup);
  }
  buildEditPetForm() {
    let fieldsGroup = {} as any;
    this.editPetInputs.forEach((input) => {
      fieldsGroup[input.controlName] = ['', [Validators.required]];
    });

    this.editPetForm = this.fb.group(fieldsGroup);
  }

  parsePetData(petsData: PetDataRaw[]) {
    petsData.forEach((petData) => {
      const petParsedData = this.petsService.mapPetData(petData);
      this.pets.push(petParsedData);
    });
  }

  getPetsData() {
    this.petsService.getPetsData().subscribe((petsData) => {
      this.petsRaw = petsData;
      this.parsePetData(petsData);
    });
  }

  resetPetsData() {
    this.pets = [];
    this.getPetsData();
  }

  addPetSubmit = () => {
    this.petsService.setNewPet(this.addPetForm.value).subscribe({
      next: (response) => {
        this.cleanAddPetForm();
        this.resetPetsData();
        this.closeModal('addPet');
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  editPetSubmit = () => {
    this.petsService.editPet(this.editPetForm.value).subscribe({
      next: (response) => {
        this.resetPetsData();
        this.closeModal('editPet');
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  handleModal(modalId: string, show: boolean, extraParams?: any) {
    const handle = {
      editPet: (show: boolean) => (this.showEditModalForm = show),
      addPet: (show: boolean) => (this.showAddModalForm = show),
    };
    handle[modalId as keyof typeof handle](show);
  }

  closeModal(modalId: string) {
    this.handleModal(modalId, false);
  }

  openModal(modalId: string, extraParams?: any) {
    this.populateEditPetInputs(extraParams.microchipId);
    this.handleModal(modalId, true, extraParams);
  }
}
