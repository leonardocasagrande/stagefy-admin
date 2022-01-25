import * as yup from 'yup';

const eventSchema = yup.object({
  name: yup.string().required('Nome do evento é obrigatório').default(''),
  professionalId: yup.string().required('Streamer é obrigatório').default(''),
  date: yup
    .date()
    .default(null)
    .typeError('Data inválida')
    .test(
      'required date',
      'Data de nascimento é obrigatória',
      (value) => !!value
    ),
  time: yup
    .date()
    .default(null)
    .typeError('Data inválida')
    .test(
      'required date',
      'Data de nascimento é obrigatória',
      (value) => !!value
    )
    .test(
      'time is in future',
      'O horário não pode ser no passado',
      // eslint-disable-next-line func-names
      function (value) {
        if (
          !!this.parent.date &&
          this.parent.date instanceof Date &&
          this.parent.date.toLocaleDateString() ===
            new Date().toLocaleDateString()
        ) {
          return value >= new Date();
        }
        return true;
      }
    ),
  image: yup
    .mixed()
    .required('Imagem é obrigatória')
    .test('is an image', 'O arquivo deve ser uma imagem', (value) => {
      return !!value && value.type.startsWith('image');
    })
    .test(
      'is not bigger than 5MB',
      'O tamanho da imagem deve ser inferior a 5 MB',
      (value) => {
        return !!value && value.size < 5000000;
      }
    ),
  viewImage: yup.string(),
});

export type TEventSchema = yup.InferType<typeof eventSchema>;

export default eventSchema;
