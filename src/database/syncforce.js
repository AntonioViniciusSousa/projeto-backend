const connection = require('../config/connection');

require('../models/CategoriesModel');
require('../models/ProductImagesModel');
require('../models/ProductOptionsModel');
require('../models/ProductsModel');
require('../models/ProductsCategoryModel');
require('../models/UserModel');

connection.sync({force:true});