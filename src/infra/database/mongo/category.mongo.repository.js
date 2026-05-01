import CategoryModel from './category.model.js';

export default class CategoryMongoRepository {
  async save(category) {
    const newCategory = new CategoryModel(category);
    return await newCategory.save();
  }

  async findByUserId(userId) {
    return await CategoryModel.find({ userId });
  }

  async findById(id) {
    return await CategoryModel.findById(id);
  }

  async update(id, category) {
    return await CategoryModel.findByIdAndUpdate(id, category, { new: true });
  }

  async delete(id) {
    return await CategoryModel.findByIdAndDelete(id);
  }
}
