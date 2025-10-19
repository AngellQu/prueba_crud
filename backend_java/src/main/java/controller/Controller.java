package controller;

import model.UsuariosDAO;
import java.sql.SQLException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class Controller {
	private static ObjectMapper mapper = new ObjectMapper();

	public static String insert(String jsonData) throws SQLException, JsonMappingException, JsonProcessingException {
		UsuariosDAO usuario = mapper.readValue(jsonData, UsuariosDAO.class);
		return resolveSqlResult(usuario.insert());
	}

	public static String delete(String jsonData) throws SQLException, JsonMappingException, JsonProcessingException {
		UsuariosDAO usuario = mapper.readValue(jsonData, UsuariosDAO.class);
		return resolveSqlResult(usuario.delete());
	}

	public static String update(String jsonData) throws SQLException, JsonMappingException, JsonProcessingException {
		UsuariosDAO usuario = mapper.readValue(jsonData, UsuariosDAO.class);
		return resolveSqlResult(usuario.update());
	}

	private static String resolveSqlResult(int result) {
		return (result > 0) ? createJsonResponse("Ejecucion exitosa (" + result + " filas afectadas)", 200)
				: createJsonResponse("No afecto ninguna fila", 204);
	}

	public static String createJsonResponse(String result, int code) {
		ObjectNode json = mapper.createObjectNode();
		json.put("status_code", code);
		json.put("message", result);
		return json.toString();
	}
}
