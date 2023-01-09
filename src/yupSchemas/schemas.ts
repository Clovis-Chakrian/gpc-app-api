import { string, number, object, date } from 'yup';

let managerSchema = object({
  name: string().required('O campo nome é obrigatório.'),
  lastname: string().required('O campo sobrenome é obrigatório.'),
  email: string().required('O campo email é obrigatório.'),
  password: string().required('O campo senha é obrigatório.')
});

let parentSchema = object({
  name: string().required('O campo nome é obrigatório'),
  lastname: string().required('O campo sobrenome é obrigatório.'),
  studentFullName: string().required('O campo nome do estudante é obrigatório.'),
  grade: string().required('O campo série é obrigatório.'),
  schoolClass: string().required('O campo turma é obrigatório.'),
  course: string().required('O campo curso é obrigatório.'),
  email: string().required('O campo email é obrigatório.'),
  password: string().required('O campo senha é obrigatório.')
});

let noticeSchema = object({
  title: string().required('O campo de título do aviso é obrigatório.'),
  description: string().required('O campo de descrição do aviso é obrigatório.'),
  schoolClass: string().required('O campo de turma do aviso é obrigatório.')
});

let eventSchema = object({
  title: string().required('O campo de título é obrigatório'),
  description: string().required('O campo de descrição é obrigatório.'),
  date: date().required('O campo de data é obrigatório.')
});

export { managerSchema, parentSchema, noticeSchema, eventSchema };