'use strict';

/**
 * project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({ 
  async find(params, populate) {
      let result = await strapi.query('project').find(params, populate);

      if (params._sort == 'category')
          return result.sort((a, b) => (a.category.name > b.category.name) ? 1 : -1);

      return result;
  },
}
))
