import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// https://petstore.swagger.io/?_gl=1*ekllh7*_gcl_au*MTYzODEyNTIzNS4xNzI3MTUzNTI2
export const apiDoc = (app: Router) => {
  const options = {
    swaggerDefinition: {
      swagger: "2.0",
      info: {
        title: "project API Documentation",
        version: "0.0.2",
      },
      host: `${process.env.BASEURL}`,
      basePath: "/",
      securityDefinitions: {
        basicAuth: {
          type: 'basic',
          name: 'authorization',
        },
        Key: {
          type: 'apiKey',
          in: 'query',
          name: 'api_key'
        }
      },
      tags: [
        {
          name: 'Authentication',
        }
      ],
      schemes: ["http", "https"],
    },
    apis: ["doc/*.yaml"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/project/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

apiDoc(app);
