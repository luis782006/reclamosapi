import { pool } from "../database/conectionMysql.js";

/**
 * Obtiene todas las oficinas de la base de datos.
 * @returns {Promise<Array>} Una promesa que resuelve a un array con todas las oficinas.
 * @throws {Error} Si ocurre un error al consultar la base de datos.
 */
const getAllOficinas = async () => {
  const consulta = "SELECT * FROM oficinas";
  const [result] = await pool.query(consulta);
  return result;
};

/**
 * Obtiene una oficina específica por su ID.
 * @param {number} id - El ID de la oficina a buscar.
 * @returns {Promise<Object|null>} Una promesa que resuelve al objeto de la oficina o null si no se encuentra.
 * @throws {Error} Si ocurre un error al consultar la base de datos.
 */
const getOneOficina = async (id) => {
  const consulta = "SELECT * FROM oficinas WHERE idOficina = ?";
  try {
    const [result] = await pool.query(consulta, [id]);
    return result;
  } catch (error) {
    console.error("Error al obtener la oficina:", error);
    throw error;
  }
};

/**
 * Crea una nueva oficina en la base de datos.
 * @param {Object} oficinaData - Los datos de la nueva oficina.
 * @param {string} oficinaData.nombre - El nombre de la oficina.
 * @param {number} oficinaData.idReclamoTipo - El ID del tipo de reclamo asociado.
 * @param {boolean} oficinaData.activo - Indica si la oficina está activa.
 * @returns {Promise<Object>} Una promesa que resuelve al objeto de la oficina creada.
 * @throws {Error} Si no se puede crear la oficina o si ocurre un error en la base de datos.
 */
const createNewOficina = async (oficinaData) => {
  const campos = Object.keys(oficinaData);
  const valores = Object.values(oficinaData);
  const signoInterrogacion = campos.map(() => '?').join(', ');
  const consulta = `INSERT INTO oficinas (${campos.join(', ')}) VALUES (${signoInterrogacion})`;
  
  try {
    const [result] = await pool.query(consulta, valores);
    if (result.affectedRows > 0) {
      return { id: result.insertId, ...oficinaData };
    } else {
      throw new Error("No se pudo crear la oficina");
    }
  } catch (error) {
    console.error("Error al crear la oficina:", error);
    throw error;
  }
};

/**
 * Actualiza una oficina existente en la base de datos.
 * @param {number} id - El ID de la oficina a actualizar.
 * @param {Object} oficinaData - Los datos actualizados de la oficina.
 * @returns {Promise<Object|null>} Una promesa que resuelve al objeto de la oficina actualizada o null si no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar la oficina en la base de datos.
 */
const updateOneOficina = async (id, oficinaData) => {
  const campos = Object.keys(oficinaData);
  const valores = campos.map((campo) => oficinaData[campo]);
  const consulta = `UPDATE oficinas SET ${campos
    .map((campo) => `${campo} = ?`)
    .join(", ")} WHERE idOficina = ?`;

  try {
    const [result] = await pool.query(consulta, [...valores, id]);
    //consulta para mostrar objeto actualizado
    //const afterUpdate =`SELECT ${campos.map((campo)=>`${campo}`).join(", ")} FROM oficinas WHERE idOficina = ?`

   //Si hubo una linea afectada entonces consulto una vez mas en la base de datos para traer y mostrar el objeto actualizado 
    if (result.affectedRows > 0) {
      return {
        info:"Campos actualizados",
        campos_actualizados : campos.map((campo)=>`${campo}`).join(", ")
      } 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al actualizar la oficina:", error);
    throw error;
  }
};

/**
 * Elimina una oficina de la base de datos.
 * @param {number} id - El ID de la oficina a eliminar.
 * @returns {Promise<Object>} Una promesa que resuelve a un objeto con un mensaje de éxito.
 * @throws {Error} Si la oficina no se encuentra o si ocurre un error al eliminarla.
 */
const deleteOneOficina = async (id) => {
  const consulta = "DELETE FROM oficinas WHERE idOficina = ?";
  try {
    const [result] = await pool.query(consulta, [id]);
    if (result.affectedRows > 0) {
      return { message: "Oficina eliminada correctamente" };
    } else {
      throw new Error("No se encontró la oficina para eliminar");
    }
  } catch (error) {
    console.error("Error al eliminar la oficina:", error);
    throw error;
  }
};

export default {
  getAllOficinas,
  getOneOficina,
  createNewOficina,
  updateOneOficina,
  deleteOneOficina,
};
