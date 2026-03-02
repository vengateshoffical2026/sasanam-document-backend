const {
  createSection: createSectionService,
  getSectionById: getSectionByIdService,
  getAllSections: getAllSectionsService,
  updateSection: updateSectionService,
  deleteSection: deleteSectionService
} = require('./service');

// Validation middleware
const validateCreateSection = (req, res, next) => {
  const { name } = req.body || {};

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Section name is required and must be a string',
      code: 'INVALID_REQUEST'
    });
  }

  if (name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Section name cannot be empty',
      code: 'INVALID_REQUEST'
    });
  }

  if (name.length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Section name cannot exceed 100 characters',
      code: 'INVALID_REQUEST'
    });
  }

  next();
};

const validateUpdateSection = (req, res, next) => {
  const { name } = req.body || {};

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Section name is required and must be a string',
      code: 'INVALID_REQUEST'
    });
  }

  if (name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Section name cannot be empty',
      code: 'INVALID_REQUEST'
    });
  }

  if (name.length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Section name cannot exceed 100 characters',
      code: 'INVALID_REQUEST'
    });
  }

  next();
};

// Handler: Create Section
const createSection = async (req, res) => {
  try {
    const result = await createSectionService(req.body);

    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error,
        code: result.status === 409 ? 'DUPLICATE_ENTRY' : 'VALIDATION_ERROR'
      });
    }

    res.status(result.status).json({
      success: true,
      message: 'Section created successfully',
      data: result.data
    });
  } catch (err) {
    console.error('Create section controller error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

// Handler: Get Section by ID
const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Section ID is required',
        code: 'INVALID_REQUEST'
      });
    }

    const result = await getSectionByIdService(id);

    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error,
        code: result.status === 404 ? 'NOT_FOUND' : 'INVALID_REQUEST'
      });
    }

    res.status(result.status).json({
      success: true,
      data: result.data
    });
  } catch (err) {
    console.error('Get section controller error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

// Handler: Get All Sections
const getAllSections = async (req, res) => {
  try {
    let { limit, page } = req.query;
    limit = limit ? parseInt(limit, 10) : 100;
    page = page ? parseInt(page, 10) : 1;
    if (isNaN(limit) || limit < 1 || isNaN(page) || page < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid limit or page parameters. Must be positive integers.',
        code: 'INVALID_REQUEST'
      });
    }
    const result = await getAllSectionsService(limit, page);
    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error,
        code: 'INVALID_REQUEST'
      });
    }
    res.status(result.status).json({
      success: true,
      data: result.data
    });
  } catch (err) {
    console.error('Get all sections controller error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

// Handler: Update Section
const updateSection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Section ID is required',
        code: 'INVALID_REQUEST'
      });
    }

    const result = await updateSectionService(id, req.body);

    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error,
        code:
          result.status === 404
            ? 'NOT_FOUND'
            : result.status === 409
            ? 'DUPLICATE_ENTRY'
            : 'VALIDATION_ERROR'
      });
    }

    res.status(result.status).json({
      success: true,
      message: 'Section updated successfully',
      data: result.data
    });
  } catch (err) {
    console.error('Update section controller error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

// Handler: Delete Section
const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Section ID is required',
        code: 'INVALID_REQUEST'
      });
    }

    const result = await deleteSectionService(id);

    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error,
        code: result.status === 404 ? 'NOT_FOUND' : 'INVALID_REQUEST'
      });
    }

    res.status(result.status).json({
      success: true,
      message: 'Section deleted successfully',
      data: result.data
    });
  } catch (err) {
    console.error('Delete section controller error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

module.exports = {
  validateCreateSection,
  validateUpdateSection,
  createSection,
  getSectionById,
  getAllSections,
  updateSection,
  deleteSection
};
