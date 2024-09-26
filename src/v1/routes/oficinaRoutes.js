import express from "express";
import oficinaController from "../../controllers/oficinaController.js";

const router = express.Router();

/**
 * @route GET /api/v1/oficinas
 * @description Obtiene todas las oficinas 
 * @access Public
 */
router.get("/", oficinaController.getAllOficinas);

/**
 * @route GET /api/v1/oficinas/:idOficina
 * @description Obtiene una oficina por su ID
 * @param {string} idOficina - ID de la oficina
 * @access Public
 */
router.get("/:idOficina", oficinaController.getOneOficina);

/**
 * @route POST /api/v1/oficinas
 * @description Crea una nueva oficina
 * @access Public
 */
router.post("/", oficinaController.createNewOficina);

/**
 * @route PATCH /api/v1/oficinas/:idOficina
 * @description Actualiza una oficina existente
 * @param {string} idOficina - ID de la oficina a actualizar
 * @access Public
 */
router.patch("/:idOficina", oficinaController.updateOneOficina);

/**
 * @route DELETE /api/v1/oficinas/:idOficina
 * @description Elimina una oficina
 * @param {string} idOficina - ID de la oficina a eliminar
 * @access Public
 */
router.delete("/:idOficina", oficinaController.deleteOneOficina);

export default router;