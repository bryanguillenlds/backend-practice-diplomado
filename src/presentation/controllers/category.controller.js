export default class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  createCategory = async (req, res) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  getCategoryByUserId = async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'userId es requerido (query ?userId=...)',
        });
      }
      const categories = await this.categoryService.getCategoryByUserId(userId);
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  getCategoryById = async (req, res) => {
    try {
      const category = await this.categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ status: 'ERROR', message: 'Categoria no encontrada' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const category = await this.categoryService.updateCategory(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ status: 'ERROR', message: 'Categoria no encontrada' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const deleted = await this.categoryService.deleteCategory(req.params.id);
      if (!deleted) {
        return res.status(404).json({ status: 'ERROR', message: 'Categoria no encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };
}
