import CategoryModel from './category.model.js';

export default class CategoryMySQLRepository {
  async save(category) {
    const newCategory = await CategoryModel.create(category);

    return newCategory.toJSON();
  }

  async findByUserId(userId) {
    return await CategoryModel.findAll({ where: { userId } });
  }

  async findById(id) {
    return await CategoryModel.findByPk(id);
  }

  async update(id, category) {
    return await CategoryModel.findByIdAndUpdate(id, category, { new: true });
  }

  async delete(id) {
    return await CategoryModel.findByIdAndDelete(id);
  }
}
