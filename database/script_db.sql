CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR(100),
correo VARCHAR(100),
edad INT
);


CREATE PROCEDURE actualizar_datos_usuarios(
    OUT filas_afectadas INT,
    p_id INT,
    p_nombre VARCHAR DEFAULT NULL,
    p_correo VARCHAR DEFAULT NULL,
    p_edad INT DEFAULT NULL 
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE usuarios
    SET
        nombre = COALESCE(p_nombre, nombre),
        correo = COALESCE(p_correo, correo),
        edad = COALESCE(p_edad, edad)
    WHERE id = p_id;
    GET DIAGNOSTICS filas_afectadas = ROW_COUNT;
END;
$$;