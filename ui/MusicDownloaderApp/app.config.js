import "dotenv/config";

const API_URL = process.env["API_URL"] || "http://43.205.196.232:8000";
const API_VERSION = process.env["API_VERSION"] || "1.0.0";
const NODE_ENV = process.env["NODE_ENV"];

export default ({config}) => {
    const appConfig = ({
      ...config,
      
      version: process.env.VERSION,
      extra: {
        eas: {
          projectId: "c3c2fb67-3ced-47fb-bc9d-9103d1239cf9"
        },
        API_URL,
        API_VERSION,
        NODE_ENV,
      }
    });
    return appConfig;
}