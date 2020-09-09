import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SequenceModel} from './Sequence.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {mimeType} from '../../../customers/mime-type.validator';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SequenceService {
  private Sequences: SequenceModel[] = [];
  private SequencesUpdated = new Subject<SequenceModel[]>();
  private opIdSub = new Subject<string>();
  form: FormGroup = new FormGroup({
    sequence_id: new FormControl(null),
    stitchcount: new FormControl('', {validators: [Validators.required]}),
    sequence_order: new FormControl('', {validators: [Validators.required]}),
    picture: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
    coupe_fil: new FormControl('', {validators: [Validators.required]}),
    back_stitch: new FormControl('', {validators: [Validators.required]}),
    parent_sequence: new FormControl('', {validators: [Validators.required]}),
    operation_template_id: new FormControl(''),
    back_stitch_positive_tolerence: new FormControl('', {validators: [Validators.required]}),
    back_stitch_negative_tolerence: new FormControl('', {validators: [Validators.required]}),
    stitch_count_positive_tolerence: new FormControl('', {validators: [Validators.required]}),
    stitch_count_negative_tolerence: new FormControl('', {validators: [Validators.required]}),
    with_subsequence: new FormControl(''),
    description: new FormControl('', {validators: [Validators.required]}),
    second_back_stitch: new FormControl('', {validators: [Validators.required]}),

  });

  constructor(private http: HttpClient, private  router: Router) {
  }

  getSequences(operation_template_id: string) {
    this.http.get<{ message: string, data: SequenceModel[] }>
    (BACKEND_URL + '/api/sequence/findByOp/' + operation_template_id)
      .pipe(map((SequenceData) => {
        return SequenceData.data.map(Sequence => {
          return {
            sequence_id: Sequence.sequence_id,
            stitchcount: Sequence.stitchcount,
            sequence_order: Sequence.sequence_order,
            picture: Sequence.picture,
            coupe_fil: Sequence.coupe_fil,
            back_stitch: Sequence.back_stitch,
            operation_template_id: Sequence.operation_template_id,
            parent_sequence: Sequence.parent_sequence,
            back_stitch_positive_tolerence: Sequence.back_stitch_positive_tolerence,
            back_stitch_negative_tolerence: Sequence.back_stitch_negative_tolerence,
            stitch_count_positive_tolerence: Sequence.stitch_count_positive_tolerence,
            stitch_count_negative_tolerence: Sequence.stitch_count_negative_tolerence,
            with_subsequence: Sequence.with_subsequence,
            description: Sequence.description,
            second_back_stitch: Sequence.second_back_stitch
          };
        });
      }))
      .subscribe((transformedSequences) => {
        this.Sequences = transformedSequences;
        this.SequencesUpdated.next([...this.Sequences]);

      });
  }

  getSequencesUpdateListner() {
    return this.SequencesUpdated.asObservable();
  }

  getIdListner() {
    return this.opIdSub.asObservable();
  }

  AddSequence(stitchcount: string, sequence_order: string,
              picture: File, operation_template_id: string,
              coupe_fil: string, back_stitch: string,
              parent_sequence: string, back_stitch_positive_tolerence: string,
              back_stitch_negative_tolerence: string, stitch_count_positive_tolerence: string,
              stitch_count_negative_tolerence: string, with_subsequence: boolean,
              description: string, second_back_stitch: string
  ) {
    const Data: any = new FormData();
    const opTemplate = parseInt(operation_template_id, 10);
    Data.append('stitchcount', stitchcount);
    Data.append('sequence_order', sequence_order);
    Data.append('picture', picture, description);
    Data.append('coupe_fil', coupe_fil);
    Data.append('back_stitch', back_stitch);
    Data.append('operation_template_id', opTemplate);
    Data.append('parent_sequence', parent_sequence);
    Data.append('back_stitch_positive_tolerence', back_stitch_positive_tolerence);
    Data.append('back_stitch_negative_tolerence', back_stitch_negative_tolerence);
    Data.append('stitch_count_positive_tolerence', stitch_count_positive_tolerence);
    Data.append('stitch_count_negative_tolerence', stitch_count_negative_tolerence);
    Data.append('with_subsequence', with_subsequence);
    Data.append('description', description);
    Data.append('second_back_stitch', second_back_stitch);
    for (const key of Data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    this.http.post<{ message: string, sequence: SequenceModel }>(BACKEND_URL + '/api/sequence/add', Data)
      .subscribe((responseData) => {
        console.log('respondata**********', responseData);
        const Sequence: SequenceModel = {
          sequence_id: responseData.sequence.sequence_id,
          stitchcount: stitchcount,
          sequence_order: sequence_order,
          picture: responseData.sequence.picture,
          coupe_fil: coupe_fil,
          back_stitch: back_stitch,
          operation_template_id: operation_template_id,
          parent_sequence: parent_sequence,
          back_stitch_positive_tolerence: back_stitch_positive_tolerence,
          back_stitch_negative_tolerence: back_stitch_negative_tolerence,
          stitch_count_positive_tolerence: stitch_count_positive_tolerence,
          stitch_count_negative_tolerence: stitch_count_negative_tolerence,
          description: description,
          with_subsequence: with_subsequence,
          second_back_stitch: second_back_stitch,
        }
        this.Sequences.push(Sequence);
        this.SequencesUpdated.next([...this.Sequences]);
        this.router.navigate(['/admin/production/:id/SequenceList']);

      });
  }

  UpdateSequence(sequence_id: string, stitchcount: string, sequence_order: string,
                 picture: File, operation_template_id: string,
                 coupe_fil: string, back_stitch: string,
                 parent_sequence: string, back_stitch_positive_tolerence: string,
                 back_stitch_negative_tolerence: string, stitch_count_positive_tolerence: string,
                 stitch_count_negative_tolerence: string, with_subsequence: boolean,
                 description: string, second_back_stitch: string) {

    let Data: any | FormData;
    if (typeof (picture) === 'object') {
      Data = new FormData();
      Data.append('stitchcount', stitchcount);
      Data.append('sequence_order', sequence_order);
      Data.append('picture', picture, description);
      Data.append('coupe_fil', coupe_fil);
      Data.append('back_stitch', back_stitch);
      Data.append('operation_template_id', operation_template_id);
      Data.append('parent_sequence', parent_sequence);
      Data.append('back_stitch_positive_tolerence', back_stitch_positive_tolerence);
      Data.append('back_stitch_negative_tolerence', back_stitch_negative_tolerence);
      Data.append('stitch_count_positive_tolerence', stitch_count_positive_tolerence);
      Data.append('stitch_count_negative_tolerence', stitch_count_negative_tolerence);
      Data.append('with_subsequence', with_subsequence);
      Data.append('description', description);
      Data.append('second_back_stitch', second_back_stitch);

    } else {
      Data = {
        sequence_id: sequence_id,
        stitchcount: stitchcount,
        sequence_order: sequence_order,
        picture: picture,
        coupe_fil: coupe_fil,
        back_stitch: back_stitch,
        operation_template_id: operation_template_id,
        parent_sequence: parent_sequence,
        back_stitch_positive_tolerence: back_stitch_positive_tolerence,
        back_stitch_negative_tolerence: back_stitch_negative_tolerence,
        stitch_count_positive_tolerence: stitch_count_positive_tolerence,
        stitch_count_negative_tolerence: stitch_count_negative_tolerence,
        with_subsequence: with_subsequence,
        description: description,
        second_back_stitch: second_back_stitch,
      }
    }
    this.http.put<{ message: string, data: SequenceModel }>(BACKEND_URL + '/api/sequence/update/' + sequence_id, Data)
      .subscribe(responseData => {
        const UpdatedSequences = [...this.Sequences];
        const oldUserIndex = UpdatedSequences.findIndex(p => p.sequence_id === sequence_id);
        const Sequence: SequenceModel = {
          sequence_id: sequence_id,
          stitchcount: stitchcount,
          sequence_order: sequence_order,
          picture: responseData.data.picture,
          coupe_fil: coupe_fil,
          back_stitch: back_stitch,
          operation_template_id: operation_template_id,
          parent_sequence: parent_sequence,
          back_stitch_positive_tolerence: back_stitch_positive_tolerence,
          back_stitch_negative_tolerence: back_stitch_negative_tolerence,
          stitch_count_positive_tolerence: stitch_count_positive_tolerence,
          stitch_count_negative_tolerence: stitch_count_negative_tolerence,
          with_subsequence: with_subsequence,
          description: description,
          second_back_stitch: second_back_stitch,

        };
        UpdatedSequences[oldUserIndex] = Sequence;
        this.Sequences = UpdatedSequences;
        this.SequencesUpdated.next([...this.Sequences]);


      })

  }

  DeleteSequence(Sequenceid: String) {
    this.http.delete(BACKEND_URL + '/api/sequence/delete/' + Sequenceid).subscribe(
      () => {
        const updatedSequence = this.Sequences.filter(Sequence => Sequence.sequence_id !== Sequenceid);
        this.Sequences = updatedSequence;
        this.SequencesUpdated.next([...this.Sequences]);
      }
    );
  }

  populateForm(Sequence) {
    this.form.patchValue(Sequence);
  }


  initializeFormGroup() {
    this.form.setValue({
      'sequence_id': null,
      'stitchcount': '',
      'sequence_order': '',
      'picture': '',
      'coupe_fil': '',
      'back_stitch': '',
      'parent_sequence': '',
      'operation_template_id': '',
      'back_stitch_positive_tolerence': '',
      'back_stitch_negative_tolerence': '',
      'stitch_count_positive_tolerence': '',
      'stitch_count_negative_tolerence': '',
      'with_subsequence': '',
      'description': '',
      'second_back_stitch': ''

    });
  }

}
