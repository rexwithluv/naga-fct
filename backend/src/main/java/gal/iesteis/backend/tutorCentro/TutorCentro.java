package gal.iesteis.backend.tutorCentro;

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
@Table(name = "tutores_centro")
public class TutorCentro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", length = 500, nullable = false)
    private String nombre;

    @Column(name = "apellidos", length = 500, nullable = false)
    private String apellidos;

    @Column(name = "email", length = 500, nullable = false)
    private String email;

    @Column(name = "curso_id", nullable = false)
    private Short cursoId;

    @Column(name = "activo", nullable = false)
    private Boolean activo;
}
