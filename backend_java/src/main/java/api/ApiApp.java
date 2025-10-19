package api;

import java.io.IOException;
import controller.Controller;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/api-app/*")
public class ApiApp extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	
	private void setCorsHeaders(HttpServletResponse res) {
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Access-Control-Allow-Credentials", "true");
	}
	
	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse res) throws IOException {
		setCorsHeaders(res);
		res.setStatus(HttpServletResponse.SC_OK);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		setCorsHeaders(res);
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		try {
			String jsonBody = req.getReader().lines().collect(Collectors.joining());
			String response = Controller.insert(jsonBody);
			res.getWriter().write(response);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			res.getWriter().write(Controller.createJsonResponse("Error interno del servidor: " + e.getMessage(), 500));
		}
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		setCorsHeaders(res);
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		try {
			String jsonBody = req.getReader().lines().collect(Collectors.joining());
			String response = Controller.update(jsonBody);
			res.getWriter().write(response);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			res.getWriter().write(Controller.createJsonResponse("Error interno del servidor: " + e.getMessage(), 500));
		}
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		setCorsHeaders(res);
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		try {
			String jsonBody = req.getReader().lines().collect(Collectors.joining());
			String response = Controller.delete(jsonBody);
			res.getWriter().write(response);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			res.getWriter().write(Controller.createJsonResponse("Error interno del servidor: " + e.getMessage(), 500));
		}
	}
}
