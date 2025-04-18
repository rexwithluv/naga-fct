package gal.iesteis.backend.alumno;

import gal.iesteis.backend.concello.Concello;
import gal.iesteis.backend.estadoAlumno.EstadoAlumno;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "alumnos", uniqueConstraints = {
        @UniqueConstraint(name = "idx_alumnos_dni_nie", columnNames = { "dni_nie" }),
        @UniqueConstraint(name = "idx_alumnos_numero_seguridad_social", columnNames = { "numero_seguridad_social" })
})
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concello_id", nullable = false, foreignKey = @ForeignKey(name = "fk_alumnos_concellos"))
    private Concello concello;

    @Column(name = "numero_seguridad_social", length = 500)
    private String numeroSeguridadSocial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false, foreignKey = @ForeignKey(name = "fk_alumnos_estado_alumnos"))
    private EstadoAlumno estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_centro_id", nullable = false, foreignKey = @ForeignKey(name = "fk_alumnos_tutor_centro"))
    private TutorCentro tutorCentro;
}
