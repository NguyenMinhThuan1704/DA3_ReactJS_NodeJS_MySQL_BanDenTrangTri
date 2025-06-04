const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const methodsService = (Model) => {
  const methods = {
    find: async (payload) => {
      try {
        let data;

        if (payload.where) {
          const page = payload.page
            ? +payload.page < 1
              ? 1
              : +payload.page
            : null;
          const pageSize = payload.pageSize ? +payload.pageSize || 10 : null;
          const skip = page && pageSize ? (page - 1) * pageSize : null;

          if (payload.where.id) {
            data = await db[Model].findByPk(payload.where.id, {
              include: payload.include,
              raw: true,
            });
          } else if (payload.findOne) {
            data = await db[Model].findOne({
              where: {
                ...payload.where,
              },
              include: payload.include,
              raw: true,
            });
          } else if (page && pageSize) {
            const { count, rows } = await db[Model].findAndCountAll({
              where: {
                ...payload.where,
              },
              offset: skip,
              limit: pageSize,
              include: payload.include,
              raw: true,
            });
            const pageNumber = Math.ceil(count / pageSize);

            data = {
              count,
              page,
              pageSize,
              pageNumber,
              rows,
            };
          } else {
            data = await db[Model].findAll({
              include: payload.include,
              where: { ...payload.where },
              raw: true,
            });
          }
        } else if (payload.page) {
          const page = +payload.page < 1 ? 1 : +payload.page;
          const pageSize = +payload.pageSize || 10;
          const skip = (page - 1) * pageSize;
          const search = payload.search || {};

          const { count, rows } = await db[Model].findAndCountAll({
            where: {
              ...search,
            },
            offset: skip,
            limit: pageSize,
            include: payload.include,
            raw: true,
          });
          const pageNumber = Math.ceil(count / pageSize);

          data = {
            count,
            page,
            pageSize,
            pageNumber,
            rows,
          };
        } else {
          data = await db[Model].findAll({
            include: payload.include,
            raw: true,
          });
        }

        if (data) {
          return {
            code: 0,
            message: "ok",
            data: data,
          };
        } else {
          return {
            code: 1,
            message: "Data is not exist!",
            data: [],
          };
        }
      } catch (error) {
        return {
          code: -1,
          message: "Something wrong in the server",
          data: [{ error }],
        };
      }
    },
    create: async (payload) => {
      try {
        if (payload.MatKhau) {
          const saltRounds = 10;
          payload.MatKhau = await bcrypt.hash(payload.MatKhau, saltRounds);
        }

        const [data, isCreated] = await db[Model].findOrCreate({
          where: { ...payload },
          raw: true,
        });

        if (isCreated) {
          return {
            code: 0,
            message: "ok",
            data: data,
          };
        } else {
          return {
            code: 1,
            message: "Data was exist!",
            data: [],
          };
        }
      } catch (error) {
        return {
          code: -1,
          message: "Something wrong in the server",
          data: [{ error }],
        };
      }
    },
    update: async (payload) => {
      try {
        const data = await db[Model].update(
          { ...payload.data },
          {
            where: {
              ...payload.where,
            },
          }
        );

        if (data[0]) {
          return {
            code: 0,
            message: "ok",
            data: data,
          };
        }

        return {
          code: 1,
          message: "Data is not exist!",
          data: [],
        };
      } catch (error) {
        return {
          code: -1,
          message: "Something wrong in the server",
          data: [{ error }],
        };
      }
    },
    delete: async (payload) => {
      try {
        const data = await db[Model].destroy({
          where: {
            ...payload.where,
          },
        });

        if (data) {
          return {
            code: 0,
            message: "ok",
            data: data,
          };
        }

        return {
          code: 1,
          message: "Data is not exist!",
          data: [],
        };
      } catch (error) {
        return {
          code: -1,
          message: "Something wrong in the server",
          data: [{ error }],
        };
      }
    },
    search: async (payload) => {
      try {
        const searchString = `%${payload.searchString}%`;
        const attributes = Object.keys(db[Model].rawAttributes);

        const searchConditions = attributes.map((attribute) => ({
          [attribute]: { [Op.like]: searchString },
        }));

        const order = [["createdAt", "DESC"]];

        if (payload.page) {
          const page = +payload.page < 1 ? 1 : +payload.page;
          const pageSize = +payload.pageSize || 10;
          const skip = (page - 1) * pageSize;

          const { count, rows } = await db[Model].findAndCountAll({
            where: {
              [Op.or]: searchConditions,
            },
            offset: skip,
            limit: pageSize,
            order: order,
            raw: true,
          });

          const pageNumber = Math.ceil(count / pageSize);

          return {
            code: 0,
            message: "ok",
            data: {
              count,
              page,
              pageSize,
              pageNumber,
              rows,
            },
          };
        } else {
          const data = await db[Model].findAll({
            where: {
              [Op.or]: searchConditions,
            },
            order: order,
            raw: true,
          });

          if (data.length) {
            return {
              code: 0,
              message: "ok",
              data,
            };
          } else {
            return {
              code: 1,
              message: "No matching records found!",
              data: [],
            };
          }
        }
      } catch (error) {
        console.error("Error in search method:", error);
        return {
          code: -1,
          message: "Something wrong in the server",
          data: [{ error }],
        };
      }
    },
    callProcedure: async (procedureName, params = [], payload = {}) => {
      try {
        const placeholders = params.map(() => "?").join(",");
        const query = `CALL ${procedureName}(${placeholders})`;

        const results = await db.sequelize.query(query, {
          replacements: params,
          type: db.sequelize.QueryTypes.RAW,
          multiple: true,
        });

        let allResults = [];
        if (Array.isArray(results) && results.length > 0) {
          allResults = results.flatMap((result) => result);
        }

        // Pagination Logic
        if (payload.page) {
          const page = +payload.page < 1 ? 1 : +payload.page;
          const pageSize = +payload.pageSize || 10;
          const skip = (page - 1) * pageSize;
          const paginatedResults = allResults.slice(skip, skip + pageSize);
          const count = allResults.length;
          const pageNumber = Math.ceil(count / pageSize);

          return {
            code: 0,
            message: "ok",
            data: {
              count,
              page,
              pageSize,
              pageNumber,
              rows: paginatedResults,
            },
          };
        } else {
          return {
            code: 0,
            message: "ok",
            data: allResults,
          };
        }
      } catch (error) {
        console.error("Error executing procedure:", error);
        return {
          code: -1,
          message: "Something wrong in the server",
          data: [{ error: error.message }],
        };
      }
    },
  };

  return methods;
};

module.exports = methodsService;
