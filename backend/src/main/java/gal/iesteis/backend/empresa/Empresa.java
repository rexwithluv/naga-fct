package gal.iesteis.backend.empresa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", length = 500, nullable = false)
    private String nombre;

    @Column(name = "concello_id", nullable = false)
    private Integer concelloId;

    @Column(name = "direccion", length = 500, nullable = false)
    private String direccion;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "especialidad_id", nullable = false)
    private Byte especialidadId;

    @Column(name = "contacto_nombre", length = 500)
    private String contactoNombre;

    @Column(name = "contacto_email", length = 500)
    private String contactoEmail;

    @Column(name = "contacto_telefono", length = 500)
    private String contactoTelefono;

    @Column(name = "activa", nullable = false)
    private Boolean activa;

    @Column(name = "plazas", columnDefinition = "DEFAULT 0")
    private Short plazas;
}
