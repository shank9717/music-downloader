import "dotenv/config";

const API_URL = process.env["API_URL"] || "http://15.206.89.79:8000";
const API_VERSION = process.env["API_VERSION"] || "1.0.0";
const NODE_ENV = process.env["NODE_ENV"];

export default ({config}) => {
    const appConfig = ({
      ...config,
      version: process.env.VERSION,
      extra: {
        API_URL,
        API_VERSION,
        NODE_ENV,
      }
    });
    return appConfig;
}