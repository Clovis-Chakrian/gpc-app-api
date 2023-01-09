interface IManager {
  id: string,
  name: string,
  lastname: string,
  email: string,
  password: string
};

interface IParent {
  id: string,
  name: string,
  lastname: string,
  studentFullName: string,
  grade: string,
  schoolClass: string,
  course: string,
  email: string,
  password: string
};

interface INotice {
  id?: string,
  title: string,
  description: string,
  schoolClass: string
}

interface IEvent {
  id: string,
  title: string,
  description: string,
  date: Date
};

// interface temporária. (falta id de mensagem e outras coisas que vao ser adicionadas quando houver o model do banco de dados)
interface IMessage {
  room: string,
  message: string,
  author: string
};

export { IManager, IMessage, IParent, INotice, IEvent };