export default class NoteEntity {
  constructor(id, title, content, image, isPrivate, password, userId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.image = image;
    this.isPrivate = isPrivate;
    this.password = password;
    this.userId = userId;
  }
}