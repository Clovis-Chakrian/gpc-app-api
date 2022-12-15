import { string, number, object } from 'yup';

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

export { managerSchema, parentSchema };