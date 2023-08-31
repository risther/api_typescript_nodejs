"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = require("fs"); //funcion para leer directorio
const PATH_ROUTER = `${__dirname}`; //devuelve la ruta del directorio actual, el ultimo directorio, donde se encuentra este archivo
const router = (0, express_1.Router)();
exports.router = router;
/**
 *
 * @returns
 */
const cleanFileName = (fileName) => {
    const file = fileName.split(".").shift();
    return file;
};
(0, fs_1.readdirSync)(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") { // no nos interesa que index.ts aparezca en el fileName
        //necesitamos importar dinamicamente los datos que estan en el itema(archivo de rutas)
        Promise.resolve().then(() => __importStar(require(`./${cleanName}`))).then((moduleRouter) => {
            console.log(`Se esta cargando la ruta... /${cleanName}`);
            router.use(`/${cleanName}`, moduleRouter.router); // el router principal usara el de nombre de la ruta, el modulo Router de item.ts
        });
        //console.log(cleanFileName(fileName));
    }
});
