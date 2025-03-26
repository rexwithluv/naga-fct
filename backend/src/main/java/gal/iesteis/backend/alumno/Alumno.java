package gal.iesteis.backend.alumno;

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
@Table(name = "alumnos")
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dni_nie", length = 500)
    private String dniNie;

    @Column(name = "nombre", length = 500, nullable = false)
    private String nombre;

    @Column(name = "apellidos", length = 500, nullable = false)
    private String apellidos;

    @Column(name = "email", length = 500, nullable = false)
    private String email;

    @Column(name = "telefono", length = 500, nullable = false)
    private String telefono;

    @Column(name = "concello_id", nullable = false)
    private Integer concelloId;

    @Column(name = "numero_seguridad_social", length = 500)
    private String numeroSeguridadSocial;

    @Column(name = "estado_id", nullable = false)
    private Byte estadoId;

    @Column(name = "tutor_empresa_id")
    private Long tutorEmpresaId;

    @Column(name = "tutor_centro_id", nullable = false)
    private Long tutorCentroId;
}
