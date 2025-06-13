import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EducationalContent } from 'src/app/models/analyticsModel';
import { EducantionalContentService } from 'src/app/services/clients/educationalcontent.service';
import { ListEducationalContent } from 'src/app/models/analyticsModel';
import { AuthService } from 'src/app/services/authservice';
import { Input } from '@angular/core';
@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss'],
})
export class AddContentComponent {
  @Input() adversery_Id: number
  contentForm: FormGroup;
  public currentUser:any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddContentComponent>,
    private educationalContentService: EducantionalContentService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUser = authService.currentUserValue
    // Initialize the form with empty values or data if it's passed for editing
    this.contentForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', [Validators.required]],
    });

    // If there's existing data, populate the form
    if (data) {
      this.contentForm.patchValue(data);
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.contentForm.patchValue(this.data);
    }
  }

  submit(): void {
    if (this.contentForm.valid) {
      let formValues = this.contentForm.value as EducationalContent;
      formValues.advisory_id = this.currentUser.id
      if(this.adversery_Id && this.adversery_Id > 0){
        this.educationalContentService.updateEducationalcontent(formValues).subscribe( resp => {
          this.dialogRef.close(resp);
  
        }, errorResp => {
        });
      }else{
        this.educationalContentService.addEducationalcontent(formValues).subscribe( resp => {
          this.dialogRef.close(resp);
  
        }, errorResp => {
        });
      }      
    }
  }

  close(): void {
    // Close the dialog without any data
    this.dialogRef.close();
  }
}
