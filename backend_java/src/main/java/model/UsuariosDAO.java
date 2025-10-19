package model;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UsuariosDAO {
	private Connection conn = PostgresConnector.getConn();
	private int id;
	private String nombre;
	private String correo;
	private int edad;

	@JsonCreator
	public UsuariosDAO(@JsonProperty("id") int id, @JsonProperty("nombre") String nombre,
			@JsonProperty("correo") String correo, @JsonProperty("edad") int edad) {
		this.id = id;
		this.nombre = nombre;
		this.correo = correo;
		this.edad = edad;
	}

	public int insert() throws SQLException {
		String sqlStatement = "insert into usuarios(nombre, correo, edad) values(?, ?, ?)";
		try (PreparedStatement stm = conn.prepareStatement(sqlStatement);) {
			stm.setString(1, nombre);
			stm.setString(2, correo);
			stm.setInt(3, edad);
			return stm.executeUpdate();
		} catch (SQLException e) {
			throw e;
		}
	}

	public int delete() throws SQLException {
		String sqlStatement = "delete from usuarios where id = ?";
		try (PreparedStatement stm = conn.prepareStatement(sqlStatement);) {
			stm.setInt(1, id);
			return stm.executeUpdate();
		} catch (SQLException e) {
			throw e;
		}
	}

	public int update() throws SQLException {
		String sqlStatement = "call actualizar_datos_usuarios(?,?,?,?,?)";
		try (CallableStatement stm = conn.prepareCall(sqlStatement);) {
			stm.registerOutParameter(1, java.sql.Types.INTEGER);
			stm.setInt(2, id);
			stm.setString(3, nombre);
			stm.setString(4, correo);
			stm.setInt(5, edad);
			stm.execute();
			return stm.getInt(1);
		} catch (SQLException e) {
			throw e;
		}
	}
}
