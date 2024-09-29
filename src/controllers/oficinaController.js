import oficinaService from "../services/oficinaService.js";

/**
 * Obtiene todas las oficinas.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const getAllOficinas = async (req, res) => {
  const allOficinas = await oficinaService.getAllOficinas();
  console.log(allOficinas);
  res.send({ status: "OK", data: allOficinas, message: "Oficinas list" });
};

/**
 * Obtiene una oficina por su ID.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const getOneOficina = async (req, res) => {
  const { idOficina } = req.params; // Obtiene el id de los parámetros de la ruta
  
  try {
    const oficina = await oficinaService.getOneOficina(idOficina);
    if (oficina) {
      res.json({ status: "OK", data: oficina });
    } else {
      res.status(404).json({ status: "ERROR", message: "Oficina no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la oficina:", error);
    res.status(500).json({ status: "ERROR", message: "Error interno del servidor" });
  }
};

/**
 * Crea una nueva oficina.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const createNewOficina = async (req, res) => {
  const cuerpo=req.body;
  //const { nombre, idReclamoTipo, activo } = req.body; 
  //if (!nombre || !idReclamoTipo || !activo) {
  //  return res.status(400).json({ 
  //    status: "ERROR", 
  //    message: "Faltan datos requeridos para crear la oficina" 
  //  });
  //}
  if (!cuerpo.nombre || !cuerpo.idReclamoTipo || !cuerpo.activo){
    return res.status(400).json({
      status:'Error',
      message:"Faltan datos requeridos para crear la oficina"
    });
  }
  const newOficina={
    nombre: cuerpo.nombre,
    idReclamoTipo: cuerpo.idReclamoTipo,
    activo:cuerpo.activo
  }

  try {
    const nuevaOficina = await oficinaService.createNewOficina(newOficina);
    res.status(201).json({ 
      status: "OK", 
      data: nuevaOficina, 
      message: "Oficina creada exitosamente" 
    });
  } catch (error) {
    console.error("Error al crear la oficina:", error);
    res.status(500).json({ 
      status: "ERROR", 
      message: "Error interno del servidor al crear la oficina" 
    });
  }
};
/**
 * Actualiza una oficina existente.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} req.params - Parámetros de la ruta.
 * @param {string} req.params.idOficina - ID de la oficina a actualizar.
 * @param {Object} req.body - Datos de actualización de la oficina.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error durante la actualización.
 */
const updateOneOficina = async (req, res) => {
  const { idOficina } = req.params;
  const actualizaciones = req.body;

  if (Object.keys(actualizaciones).length === 0) {
    return res.status(400).json({ 
      status: "ERROR", 
      message: "No se proporcionaron datos para actualizar" 
    });
  }

  try {
    const oficinaActualizada = await oficinaService.updateOneOficina(idOficina, actualizaciones);

    if (!oficinaActualizada) {
      return res.status(404).json({ status: "ERROR", message: "Oficina no encontrada" });
    }

    res.json({ 
      status: "OK", 
      data: oficinaActualizada, 
      message: "Oficina actualizada exitosamente" 
    });
  } catch (error) {
    console.error("Error al actualizar la oficina:", error);
    res.status(500).json({ status: "ERROR", message: "Error interno del servidor al actualizar la oficina" });
  }
};

/**
 * Elimina una oficina.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} req.params - Parámetros de la ruta.
 * @param {string} req.params.idOficina - ID de la oficina a eliminar.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
const deleteOneOficina = async (req, res) => {
  const { idOficina } = req.params;

  try {
    await oficinaService.deleteOneOficina(idOficina);
    res.json({ 
      status: "OK", 
      message: "Oficina eliminada exitosamente" 
    });
  } catch (error) {
    console.error("Error al eliminar la oficina:", error);
    if (error.message === 'No se encontró la oficina para eliminar') {
      res.status(404).json({ status: "ERROR", message: "Oficina no encontrada" });
    } else {
      res.status(500).json({ status: "ERROR", message: "Error interno del servidor al eliminar la oficina" });
    }
  }
};

export default {
  getAllOficinas,
  getOneOficina,
  createNewOficina,
  updateOneOficina,
  deleteOneOficina,
};