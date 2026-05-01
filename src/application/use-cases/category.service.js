import CategoryEntity from "../../domain/entities/category.entity.js";

export default class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(category) {
    if (!category.name) { throw new Error('Name is required') };

    const newCategory = new CategoryEntity(category.id, category.name, category.userId);

    return await this.categoryRepository.save(newCategory);
  }

  async getCategoryByUserId(userId) {
    return await this.categoryRepository.findByUserId(userId);
  }

  async getCategoryById(id) {
    return await this.categoryRepository.findById(id);
  }

  async updateCategory(id, category) {
    return await this.categoryRepository.update(id, category);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}
