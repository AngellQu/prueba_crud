package model;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;

public class PostgresConnector {

	private static Connection conn;

	public static Connection getConn() {
		try {
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/prueba_crud", "pruebacrud", "1234");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return conn;
	}
}
