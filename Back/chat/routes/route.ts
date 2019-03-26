// {} destructuracion
// alista -> todo el archivo o ruta

import { Request, Response, Router } from 'express';

export var router = Router();

router.get('/prueba',(req:Request, res:Response)=>{
    res.status(200).send("Bienvenido");
});